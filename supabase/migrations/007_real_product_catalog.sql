-- ============================================================
-- Efra Business Group — Real Product Catalog
-- Replaces the placeholder Mining/Agricultural subcategories with
-- the actual product line, and adds Industrial Machinery for the
-- first time. Uses the pre-existing product_categories.parent_id
-- self-reference (Main Category -> Subcategory), so no schema
-- change is needed — only data.
--
-- ⚠️ DESTRUCTIVE for the placeholder data seeded in 002_seed_data.sql:
-- it deletes the old Mining subcategories (Gold Washing Systems,
-- Industrial Crushers, Fine Grinding Mills) and Agricultural
-- subcategories (Tractors & Primary Tillage, Secondary Tillage),
-- along with every product under them. This is safe for
-- quote_requests (product_id is ON DELETE SET NULL — historical
-- quotes keep their free-text product_interest and simply lose the
-- structured link) and safe for watchlist_items (ON DELETE CASCADE
-- — any saved placeholder products just disappear from watchlists).
-- If you've since added real, non-placeholder products of your own
-- under those old subcategory slugs via the Admin Panel, back them
-- up before running this.
-- ============================================================

-- ---------- 1. Remove the old placeholder subcategories + products ----------

DO $$
DECLARE
  mining_id UUID;
  agri_id UUID;
BEGIN
  SELECT id INTO mining_id FROM public.product_categories WHERE slug = 'mining-mineral-processing';
  SELECT id INTO agri_id FROM public.product_categories WHERE slug = 'agricultural-machinery';

  DELETE FROM public.products
  WHERE category_id IN (
    SELECT id FROM public.product_categories WHERE parent_id IN (mining_id, agri_id)
  );

  DELETE FROM public.product_categories WHERE parent_id IN (mining_id, agri_id);
END $$;

-- ---------- 2. Tidy up the main category translations ----------

UPDATE public.product_categories
SET name_am = 'የማዕድን ማውጣትና ማቀነባበሪያ ማሽነሪ',
    description_en = 'Heavy-duty extraction and mineral processing equipment for Ethiopian mining operations.'
WHERE slug = 'mining-mineral-processing';

UPDATE public.product_categories
SET name_am = 'የግብርና ማሽነሪና ተጎታች መሳሪያዎች',
    description_en = 'High-performance tractors, implements, and modern farming solutions.'
WHERE slug = 'agricultural-machinery';

UPDATE public.product_categories
SET name_am = 'ሌሎች የኢንዱስትሪ ማሽነሪዎች',
    description_en = 'Generators, welding & cutting equipment, and air compressors for industrial and construction sites.'
WHERE slug = 'industrial-machinery';

-- ---------- 3. Mining & Mineral Processing subcategories ----------

INSERT INTO public.product_categories (slug, name_en, name_am, description_en, description_am, parent_id, sort_order) VALUES
  ('washing-machine', 'Washing Machines', 'የማጠቢያ ማሽኖች', 'Gold washing plants for artisanal to industrial-scale mineral recovery.', 'ከአነስተኛ እስከ ኢንዱስትሪ ደረጃ የወርቅ ማጠቢያ ማሽኖች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 1),
  ('gold-crusher-machine', 'Gold Crusher Machines', 'የወርቅ መፍጫ ማሽኖች', 'GCM Series crushers for ore and stone reduction, sized by capacity.', 'እንደ አቅማቸው የተከፋፈሉ የ GCM ተከታታይ የድንጋይና የማዕድን መፍጫ ማሽኖች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 2),
  ('ball-mill', 'Ball Mills', 'የኳስ መፍጫ ማሽኖች', 'Industrial ball mills for fine grinding of processed ore.', 'የተፈጨ ማዕድንን በደንብ ለመፍጨት የሚያገለግሉ የኳስ መፍጫ ማሽኖች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 3),
  ('trommel-machine', 'Trommel Machines', 'ትሮሜል ማሽኖች', 'Rotary trommel screens for material sizing and washing.', 'ቁሳቁሶችን ለመለየትና ለማጠብ የሚያገለግሉ ትሮሜል ማጣሪያ ማሽኖች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 4),
  ('water-pumps', 'Water Pumps', 'የውሃ ፓምፖች', 'High flow-rate pumps for site dewatering and wash-plant supply.', 'ለቦታ ፍሳሽ ማስወገጃና ለማጠቢያ ማሽኖች የውሃ አቅርቦት የሚያገለግሉ ከፍተኛ ፍሰት ፓምፖች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 5),
  ('accessories', 'Accessories', 'ተጨማሪ እቃዎች', 'Mats, hoses, valves, and connectors for wash-plant setups.', 'ለማጠቢያ ማሽን ተከላ የሚያገለግሉ ምንጣፎች፣ ቱቦዎች፣ ቫልቮችና ማገናኛዎች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 6),
  ('mining-spare-parts', 'Spare Parts', 'መለዋወጫ እቃዎች', 'Genuine wear parts, filters, and belts for mining equipment.', 'ለማዕድን ማሽነሪዎች የሚሆኑ ኦሪጅናል መለዋወጫ ዕቃዎች፣ ማጣሪያዎችና ቀበቶዎች።', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 7);

-- ---------- 4. Agricultural Machinery subcategories ----------

INSERT INTO public.product_categories (slug, name_en, name_am, description_en, description_am, parent_id, sort_order) VALUES
  ('tractor', 'Tractors', 'ትራክተሮች', 'Utility tractors engineered for Ethiopian farming conditions.', 'ለኢትዮጵያ የእርሻ ሁኔታ የተዘጋጁ የግብርና ትራክተሮች።', (SELECT id FROM public.product_categories WHERE slug = 'agricultural-machinery'), 1),
  ('implement', 'Implements', 'ተጎታች መሳሪያዎች', 'Ploughs, harrows, ridgers, trailers, cultivators, and threshers.', 'ማረሻዎች፣ ማለስለሻዎች፣ ትሬለሮችና መውቂያ መሳሪያዎች።', (SELECT id FROM public.product_categories WHERE slug = 'agricultural-machinery'), 2),
  ('agricultural-spare-parts', 'Spare Parts', 'መለዋወጫ እቃዎች', 'Filters, fluids, blades, and shares for tractors and implements.', 'ለትራክተርና ተጎታች መሳሪያዎች የሚሆኑ ማጣሪያዎችና ምላጦች።', (SELECT id FROM public.product_categories WHERE slug = 'agricultural-machinery'), 3);

-- ---------- 5. Industrial Machinery subcategories (new) ----------

INSERT INTO public.product_categories (slug, name_en, name_am, description_en, description_am, parent_id, sort_order) VALUES
  ('generators', 'Diesel Generators', 'ናፍጣ ጀነሬተሮች', 'Standby and prime power diesel generator sets for sites and facilities.', 'ለተለያዩ ቦታዎችና ተቋማት የሚሆኑ የናፍጣ ጀነሬተሮች።', (SELECT id FROM public.product_categories WHERE slug = 'industrial-machinery'), 1),
  ('welding-cutting-equipment', 'Welding & Cutting Equipment', 'የብየዳ እና መቁረጫ መሳሪያዎች', 'Arc, MIG, and plasma equipment for fabrication and site work.', 'ለብረት ስራና ግንባታ የሚያገለግሉ የብየዳና መቁረጫ መሳሪያዎች።', (SELECT id FROM public.product_categories WHERE slug = 'industrial-machinery'), 2),
  ('air-compressors', 'Air Compressors', 'የአየር መጭመቂያዎች', 'Screw and piston air compressors for workshops and industrial sites.', 'ለወርክሾፕና ለኢንዱስትሪ ስራ የሚያገለግሉ የአየር መጭመቂያ ማሽኖች።', (SELECT id FROM public.product_categories WHERE slug = 'industrial-machinery'), 3);

-- ---------- 6. Mining products ----------

-- Washing Machines
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'washing-machine'), 'efra-gwm-01', 'GWM-01', 'Efra GWM 01', 'Compact gold washing machine designed for small-scale mining operations.', '{"capacity": "Small-scale", "application": "Artisanal & small-scale gold mining", "power_source": "Diesel/Electric hybrid", "water_consumption": "Low", "mobility": "Portable"}', TRUE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'washing-machine'), 'efra-gwm-02', 'GWM-02', 'Efra GWM 02', 'Mid-capacity gold washing machine for growing mining operations.', '{"capacity": "Medium-scale", "application": "Small commercial mining", "power_source": "Diesel/Electric hybrid", "water_consumption": "Medium", "mobility": "Portable"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'washing-machine'), 'efra-gwm-03', 'GWM-03', 'Efra GWM 03', 'High-capacity industrial gold washing machine for large-scale mineral extraction.', '{"capacity": "Industrial-scale", "application": "Commercial gold mining operations", "power_source": "Industrial diesel", "water_consumption": "Medium-High", "mobility": "Stationary/Modular"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'washing-machine'), 'efra-premium-gwm', 'GWM-Premium', 'Efra Premium GWM', 'Flagship gold washing system with the highest throughput and recovery rate in the range.', '{"capacity": "Industrial-scale (Premium)", "application": "High-volume commercial mining operations", "power_source": "Industrial diesel", "water_consumption": "High", "mobility": "Stationary/Modular"}', TRUE, 4);

-- Gold Crusher Machines
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-crusher-machine'), 'efra-gcm-01', 'GCM-01', 'Efra GCM 01', 'Entry-level crusher for medium-capacity stone and ore processing.', '{"series": "GCM", "capacity_tph": "30-50", "feed_size_mm": "400", "output_size_mm": "20-50", "motor_power_kw": "75"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-crusher-machine'), 'efra-gcm-02', 'GCM-02', 'Efra GCM 02', 'Mid-range crusher for high-volume mining operations.', '{"series": "GCM", "capacity_tph": "50-100", "feed_size_mm": "500", "output_size_mm": "20-50", "motor_power_kw": "110"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-crusher-machine'), 'efra-gcm-03', 'GCM-03', 'Efra GCM 03', 'Heavy-duty crusher for large-scale mineral processing plants.', '{"series": "GCM", "capacity_tph": "100-200", "feed_size_mm": "600", "output_size_mm": "20-80", "motor_power_kw": "160"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-crusher-machine'), 'efra-premium-gcm', 'GCM-Premium', 'Efra Premium GCM', 'Maximum-capacity crusher for enterprise mining operations.', '{"series": "GCM", "capacity_tph": "200-350", "feed_size_mm": "750", "output_size_mm": "20-100", "motor_power_kw": "250"}', TRUE, 4);

-- Ball Mills
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'ball-mill'), 'efra-gbmm-01', 'GBMM-01', 'Efra GBMM 01', 'Compact ball mill for fine grinding in small processing plants.', '{"type": "Ball Mill", "capacity_tph": "1-3", "drum_diameter_m": "1.2", "motor_power_kw": "15"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'ball-mill'), 'efra-gbmm-02', 'GBMM-02', 'Efra GBMM 02', 'Mid-capacity ball mill for standard mineral processing operations.', '{"type": "Ball Mill", "capacity_tph": "3-8", "drum_diameter_m": "1.8", "motor_power_kw": "37"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'ball-mill'), 'efra-gbmm-03', 'GBMM-03', 'Efra GBMM 03', 'High-capacity ball mill for industrial-scale fine grinding.', '{"type": "Ball Mill", "capacity_tph": "8-15", "drum_diameter_m": "2.4", "motor_power_kw": "75"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'ball-mill'), 'efra-premium-gbmm', 'GBMM-Premium', 'Efra Premium GBMM', 'Flagship ball mill for maximum-throughput grinding circuits.', '{"type": "Ball Mill", "capacity_tph": "15-25", "drum_diameter_m": "3.0", "motor_power_kw": "132"}', TRUE, 4);

-- Trommel Machines
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'trommel-machine'), 'efra-gtmm-01', 'GTMM-01', 'Efra GTMM 01', 'Rotary trommel screen for sizing and washing ore ahead of processing.', '{"type": "Trommel Screen", "capacity_tph": "20-40", "drum_diameter_m": "1.2", "screen_apertures_mm": "5-30", "motor_power_kw": "22"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'trommel-machine'), 'efra-premium-gtmm', 'GTMM-Premium', 'Efra Premium GTMM', 'High-capacity trommel for continuous large-volume operations.', '{"type": "Trommel Screen", "capacity_tph": "40-80", "drum_diameter_m": "1.8", "screen_apertures_mm": "5-40", "motor_power_kw": "37"}', TRUE, 2);

-- Water Pumps
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'iveco-55-flowrate-pump', 'IVC-55', 'Iveco 55 Flowrate Pump', 'Iveco-powered water pump for site dewatering and wash-plant supply.', '{"brand": "Iveco", "flow_rate": "55 m3/h", "engine": "Iveco diesel", "application": "Dewatering & wash-plant supply"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'iveco-75-flowrate-pump', 'IVC-75', 'Iveco 75 Flowrate Pump', 'Higher-output Iveco-powered pump for larger wash plants.', '{"brand": "Iveco", "flow_rate": "75 m3/h", "engine": "Iveco diesel", "application": "Dewatering & wash-plant supply"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'iveco-100-flowrate-pump', 'IVC-100', 'Iveco 100 Flowrate Pump', 'High-volume Iveco-powered pump for large-scale site water supply.', '{"brand": "Iveco", "flow_rate": "100 m3/h", "engine": "Iveco diesel", "application": "Dewatering & wash-plant supply"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'yuchai-pump', 'YC-PUMP', 'Yuchai Pump', 'Yuchai-powered water pump for reliable site water supply.', '{"brand": "Yuchai", "engine": "Yuchai diesel", "application": "Site water supply"}', FALSE, 4),
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'weichai-pump', 'WC-PUMP', 'Weichai Pump', 'Weichai-powered water pump built for heavy-duty continuous operation.', '{"brand": "Weichai", "engine": "Weichai diesel", "application": "Site water supply"}', FALSE, 5),
  ((SELECT id FROM public.product_categories WHERE slug = 'water-pumps'), 'sino-pump', 'SINO-PUMP', 'Sino Pump', 'Sino-powered water pump offering dependable output for mining sites.', '{"brand": "Sino", "engine": "Sino diesel", "application": "Site water supply"}', FALSE, 6);

-- Accessories
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'jibba-mat', 'ACC-JIBBA', 'Jibba (Mat)', 'Riffle mat used inside sluice boxes and wash plants to trap fine gold.', '{"category": "Wash-plant accessory", "material": "Rubber/PVC riffle mat"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'delivery-hose', 'ACC-DHOSE', 'Delivery Hose', 'Heavy-duty delivery hose for pumping water from source to wash plant.', '{"category": "Hose", "type": "Delivery"}', 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'sectional-hose', 'ACC-SHOSE', 'Sectional Hose', 'Modular sectional hose for flexible site water routing.', '{"category": "Hose", "type": "Sectional"}', 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'foot-valve', 'ACC-FVALVE', 'Foot Valve', 'Foot valve for pump suction lines, prevents backflow when priming.', '{"category": "Valve", "type": "Foot valve"}', 4),
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'connector', 'ACC-CONN', 'Connector', 'Hose and pipe connector for wash-plant and pump assemblies.', '{"category": "Fitting", "type": "Connector"}', 5),
  ((SELECT id FROM public.product_categories WHERE slug = 'accessories'), 'small-generator', 'ACC-GEN-SM', 'Small Generator', 'Portable generator for powering small tools and lighting on-site.', '{"category": "Power", "type": "Portable generator"}', 6);

-- Mining Spare Parts
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'mining-spare-parts'), 'mining-wear-parts-kit', 'SP-MIN-01', 'Wear Parts Kit', 'Genuine wear parts kit for crushers, mills, and washing machines.', '{"category": "Spare Parts", "coverage": "Crushers, mills, washing machines"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'mining-spare-parts'), 'mining-filters-belts-kit', 'SP-MIN-02', 'Filters & Belts Kit', 'Replacement filters and drive belts for mining equipment.', '{"category": "Spare Parts", "coverage": "Filters & belts"}', 2);

-- ---------- 7. Agricultural products ----------

-- Tractors
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'tractor'), 'efra-tr-70', 'TR-70', 'Efra TR 70', '70HP utility tractor for small to mid-sized farms.', '{"horsepower": "70 HP", "drive": "4WD", "transmission": "12F+4R", "lift_capacity_kg": "1800", "application": "General farming & tillage"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'tractor'), 'efra-tr-90', 'TR-90', 'Efra TR 90', '90HP utility tractor engineered for Ethiopian agricultural conditions.', '{"horsepower": "90 HP", "drive": "4WD", "transmission": "16F+8R", "lift_capacity_kg": "2500", "application": "General farming & tillage"}', TRUE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'tractor'), 'efra-tr-110', 'TR-110', 'Efra TR 110', '110HP heavy tractor for large-scale farming operations.', '{"horsepower": "110 HP", "drive": "4WD", "transmission": "16F+8R", "lift_capacity_kg": "3200", "application": "Heavy tillage & large-scale farming"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'tractor'), 'efra-premium-tr', 'TR-Premium', 'Efra Premium TR', 'Flagship high-horsepower tractor for the most demanding farming operations.', '{"horsepower": "130 HP", "drive": "4WD", "transmission": "16F+8R", "lift_capacity_kg": "4000", "application": "Heavy tillage & large-scale farming"}', TRUE, 4);

-- Implements
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'disc-plough', 'IMP-DPL', 'Disc Plough', 'Robust disc plough for primary tillage in hard soils.', '{"discs": "3-5", "disc_diameter_mm": "660", "working_width_m": "1.2-2.0", "weight_kg": "450", "application": "Primary tillage"}', TRUE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'disc-harrow', 'IMP-DHR', 'Disc Harrow', 'High-durability disc harrow for secondary tillage and field preparation.', '{"discs": "24", "working_width_m": "2.4", "disc_diameter_mm": "560", "weight_kg": "680", "application": "Secondary tillage"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'ridger', 'IMP-RDG', 'Ridger', 'Precision ridger for row-crop bed formation.', '{"rows": "2-4", "working_width_m": "1.6-3.2", "ridger_type": "Adjustable", "application": "Row crop preparation"}', FALSE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'trailer', 'IMP-TRL', 'Trailer', 'Farm trailer for hauling produce, feed, and equipment.', '{"capacity_tonnes": "3-5", "axle": "Single/Tandem", "tipping": "Hydraulic", "application": "General farm haulage"}', FALSE, 4),
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'cultivator', 'IMP-CUL', 'Cultivator', 'Field cultivator for seedbed preparation and weed control.', '{"tines": "9-11", "working_width_m": "2.0-2.8", "application": "Seedbed preparation"}', FALSE, 5),
  ((SELECT id FROM public.product_categories WHERE slug = 'implement'), 'thresher', 'IMP-THR', 'Thresher', 'Grain thresher for post-harvest processing of cereal crops.', '{"capacity_tph": "1-2", "crop_types": "Wheat, teff, barley", "power_source": "PTO/Diesel", "application": "Post-harvest threshing"}', TRUE, 6);

-- Agricultural Spare Parts
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'agricultural-spare-parts'), 'agri-filters-fluids-kit', 'SP-AGR-01', 'Tractor Filters & Fluids Kit', 'Replacement filters and fluids kit for routine tractor servicing.', '{"category": "Spare Parts", "coverage": "Oil, air & fuel filters, fluids"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'agricultural-spare-parts'), 'agri-plough-blades-kit', 'SP-AGR-02', 'Plough Blades & Shares Kit', 'Replacement blades and shares for ploughs and cultivators.', '{"category": "Spare Parts", "coverage": "Blades & shares"}', 2);

-- ---------- 8. Industrial Machinery products (new) ----------

-- Diesel Generators
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'generators'), 'efra-gen-20kva', 'GEN-20', 'Efra Generator 20KVA', 'Compact diesel generator for small workshops and backup power.', '{"power_output": "20 KVA", "phase": "Single/Three phase", "fuel": "Diesel", "application": "Small site & backup power"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'generators'), 'efra-gen-50kva', 'GEN-50', 'Efra Generator 50KVA', 'Mid-capacity diesel generator for workshops and small facilities.', '{"power_output": "50 KVA", "phase": "Three phase", "fuel": "Diesel", "application": "Workshop & facility power"}', TRUE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'generators'), 'efra-gen-100kva', 'GEN-100', 'Efra Generator 100KVA', 'High-capacity diesel generator for industrial sites.', '{"power_output": "100 KVA", "phase": "Three phase", "fuel": "Diesel", "application": "Industrial site power"}', TRUE, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'generators'), 'efra-gen-250kva', 'GEN-250', 'Efra Generator 250KVA', 'Heavy-duty diesel generator for large industrial and construction sites.', '{"power_output": "250 KVA", "phase": "Three phase", "fuel": "Diesel", "application": "Large industrial & construction sites"}', FALSE, 4);

-- Welding & Cutting Equipment
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'welding-cutting-equipment'), 'efra-arc-welder', 'WLD-ARC', 'Efra Arc Welding Machine', 'Reliable arc (stick) welding machine for general fabrication and repair work.', '{"type": "Arc/Stick", "output_current_a": "20-200", "input": "Single phase", "application": "General fabrication & repair"}', TRUE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'welding-cutting-equipment'), 'efra-mig-welder', 'WLD-MIG', 'Efra MIG Welding Machine', 'MIG welding machine for faster, cleaner welds on steel fabrication work.', '{"type": "MIG/MAG", "output_current_a": "30-250", "input": "Single/Three phase", "application": "Steel fabrication"}', FALSE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'welding-cutting-equipment'), 'efra-plasma-cutter', 'WLD-PLC', 'Efra Plasma Cutter', 'Plasma cutting machine for clean, precise metal cutting.', '{"type": "Plasma Cutter", "cutting_thickness_mm": "up to 25", "input": "Single/Three phase", "application": "Metal cutting & fabrication"}', FALSE, 3);

-- Air Compressors
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'air-compressors'), 'efra-screw-compressor-10hp', 'CMP-S10', 'Efra Screw Air Compressor 10HP', 'Rotary screw air compressor for continuous workshop use.', '{"type": "Rotary Screw", "power_hp": "10", "air_delivery_cfm": "35-40", "application": "Workshop & tool operation"}', FALSE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'air-compressors'), 'efra-screw-compressor-20hp', 'CMP-S20', 'Efra Screw Air Compressor 20HP', 'Higher-output rotary screw compressor for industrial air demand.', '{"type": "Rotary Screw", "power_hp": "20", "air_delivery_cfm": "75-85", "application": "Industrial air supply"}', TRUE, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'air-compressors'), 'efra-piston-compressor', 'CMP-P01', 'Efra Piston Air Compressor', 'Reciprocating piston air compressor for intermittent site and workshop use.', '{"type": "Piston/Reciprocating", "power_hp": "5", "air_delivery_cfm": "15-18", "application": "Intermittent workshop use"}', FALSE, 3);
