import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BrandForm from "@/components/admin/BrandForm";

type Params = Promise<{ id: string }>;

export default async function EditBrandPage({ params }: { params: Params }) {
  const { id } = await params;
  const brand = await prisma.brand.findUnique({ where: { id: Number(id) } });
  if (!brand) notFound();

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Edit Brand</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">{brand.name}</h1>
      </div>
      <BrandForm
        brand={{
          id: brand.id,
          name: brand.name,
          slug: brand.slug,
          description: brand.description || "",
          logo: brand.logo || "",
          website: brand.website || "",
          isActive: brand.isActive,
        }}
      />
    </div>
  );
}
