-- ============================================================
-- Seed Data: Product Categories & Products from Data.txt
-- Efra Business Group — Mining, Agriculture, Industrial
-- ============================================================

-- Top-level categories
INSERT INTO public.product_categories (slug, name_en, name_am, description_en, sort_order) VALUES
  ('mining-mineral-processing', 'Mining & Mineral Processing Machinery', 'የማዕድን እና የ mineral processing machinery', 'Heavy-duty extraction and mineral processing equipment for Ethiopian mining operations.', 1),
  ('agricultural-machinery', 'Agricultural Machinery & Implements', 'የግብርና machinery & implements', 'High-performance tractors, tillage equipment, and modern farming solutions.', 2),
  ('industrial-machinery', 'Other Industrial Machinery', 'ሌሎች industrial machinery', 'Custom industrial machinery, mechanical components, and specialised sector equipment.', 3);

-- Mining sub-categories
INSERT INTO public.product_categories (slug, name_en, description_en, parent_id, sort_order) VALUES
  ('gold-washing-systems', 'Gold Washing Systems', 'Small-scale and industrial gold washing systems for mineral extraction.', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 1),
  ('industrial-crushers', 'Industrial Crushers', 'GCM Series crushers categorised by capacity sizes.', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 2),
  ('fine-grinding-mills', 'Fine Grinding Mills', 'Industrial ball mills for fine grinding operations.', (SELECT id FROM public.product_categories WHERE slug = 'mining-mineral-processing'), 3);

-- Agriculture sub-categories
INSERT INTO public.product_categories (slug, name_en, description_en, parent_id, sort_order) VALUES
  ('tractors-primary-tillage', 'Tractors & Primary Tillage', 'High-performance utility tractors and heavy-duty disc ploughs.', (SELECT id FROM public.product_categories WHERE slug = 'agricultural-machinery'), 1),
  ('secondary-tillage', 'Secondary Tillage & Field Prep', 'Disc harrows, replacement disk plates, and row-crop ridgers.', (SELECT id FROM public.product_categories WHERE slug = 'agricultural-machinery'), 2);

-- Gold Washing Systems
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-washing-systems'), 'gwm-01-gold-washing-system', 'GWM-01', 'Small-Scale Gold Washing System', 'Compact gold washing system designed for small-scale mining operations across Ethiopia.', '{"capacity": "Small-scale", "application": "Artisanal & small-scale gold mining", "power_source": "Diesel/Electric hybrid", "water_consumption": "Low", "mobility": "Portable"}', TRUE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'gold-washing-systems'), 'gwm-02-gold-washing-system', 'GWM-02', 'Industrial-Scale Gold Washing System', 'High-capacity industrial gold washing system for large-scale mineral extraction.', '{"capacity": "Industrial-scale", "application": "Commercial gold mining operations", "power_source": "Industrial diesel", "water_consumption": "Medium-High", "mobility": "Stationary/Modular"}', TRUE, 2);

-- Industrial Crushers (GCM Series)
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'industrial-crushers'), 'gcm-01-industrial-crusher', 'GCM-01', 'GCM-01 Industrial Crusher', 'Entry-level industrial crusher for medium-capacity stone and ore processing.', '{"series": "GCM", "capacity_tph": "30-50", "feed_size_mm": "400", "output_size_mm": "20-50", "motor_power_kw": "75"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'industrial-crushers'), 'gcm-02-industrial-crusher', 'GCM-02', 'GCM-02 Industrial Crusher', 'Mid-range industrial crusher for high-volume mining operations.', '{"series": "GCM", "capacity_tph": "50-100", "feed_size_mm": "500", "output_size_mm": "20-50", "motor_power_kw": "110"}', 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'industrial-crushers'), 'gcm-03-industrial-crusher', 'GCM-03', 'GCM-03 Industrial Crusher', 'Heavy-duty crusher for large-scale mineral processing plants.', '{"series": "GCM", "capacity_tph": "100-200", "feed_size_mm": "600", "output_size_mm": "20-80", "motor_power_kw": "160"}', 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'industrial-crushers'), 'gcm-04-industrial-crusher', 'GCM-04', 'GCM-04 Industrial Crusher', 'Maximum capacity industrial crusher for enterprise mining operations.', '{"series": "GCM", "capacity_tph": "200-350", "feed_size_mm": "750", "output_size_mm": "20-100", "motor_power_kw": "250"}', 4);

-- Fine Grinding Mills
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'fine-grinding-mills'), 'ball-mill-01', 'BM-01', 'Industrial Ball Mill — Model 01', 'Compact industrial ball mill for fine grinding in small processing plants.', '{"type": "Ball Mill", "capacity_tph": "1-3", "drum_diameter_m": "1.2", "motor_power_kw": "15"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'fine-grinding-mills'), 'ball-mill-02', 'BM-02', 'Industrial Ball Mill — Model 02', 'Mid-capacity ball mill for standard mineral processing operations.', '{"type": "Ball Mill", "capacity_tph": "3-8", "drum_diameter_m": "1.8", "motor_power_kw": "37"}', 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'fine-grinding-mills'), 'ball-mill-03', 'BM-03', 'Industrial Ball Mill — Model 03', 'High-capacity ball mill for industrial-scale fine grinding.', '{"type": "Ball Mill", "capacity_tph": "8-15", "drum_diameter_m": "2.4", "motor_power_kw": "75"}', 3);

-- Agricultural Machinery
INSERT INTO public.products (category_id, slug, model_number, name_en, description_en, specs, is_featured, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'tractors-primary-tillage'), 'utility-tractor-80hp', 'TR-80', 'High-Performance Utility Tractor', '80HP utility tractor engineered for Ethiopian agricultural conditions.', '{"horsepower": "80 HP", "drive": "4WD", "transmission": "16F+8R", "lift_capacity_kg": "2500", "application": "General farming & tillage"}', TRUE, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'tractors-primary-tillage'), 'heavy-disc-plough', 'DP-HD', 'Heavy-Duty Disc Plough', 'Robust disc plough for primary tillage in hard soils.', '{"discs": "3-5", "disc_diameter_mm": "660", "working_width_m": "1.2-2.0", "weight_kg": "450", "application": "Primary tillage"}', 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'secondary-tillage'), 'disc-harrow-24', 'DH-24', 'Disc Harrow — 24 Disc', 'High-durability disc harrow for secondary tillage and field preparation.', '{"discs": "24", "working_width_m": "2.4", "disc_diameter_mm": "560", "weight_kg": "680", "application": "Secondary tillage"}', 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'secondary-tillage'), 'row-crop-ridger', 'RCR-01', 'Row-Crop Ridger', 'Precision row-crop ridger for modern farming operations.', '{"rows": "2-4", "working_width_m": "1.6-3.2", "ridger_type": "Adjustable", "application": "Row crop preparation"}', 2);
