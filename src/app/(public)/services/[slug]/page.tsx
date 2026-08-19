import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services } from "@/lib/content/company";
import { getServiceImage } from "@/lib/assets/images";
import ServiceDetailClient from "./ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const p = await params;
  const service = services.find((s) => s.slug === p.slug);
  
  if (!service) return { title: "Service Not Found" };
  
  return {
    title: `${service.name} | Efra Business Group`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const p = await params;
  const service = services.find((s) => s.slug === p.slug);

  if (!service) {
    notFound();
  }

  const serviceImage = getServiceImage(service.slug);

  return (
    <ServiceDetailClient
      slug={service.slug}
      serviceImage={serviceImage}
      fallbackName={service.name}
      fallbackDescription={service.description}
    />
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
