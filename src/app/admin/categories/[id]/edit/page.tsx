import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CategoryForm from "@/components/admin/CategoryForm";

type Params = Promise<{ id: string }>;

export default async function EditCategoryPage({ params }: { params: Params }) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id: Number(id) } });
  if (!category) notFound();

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Edit Category</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">
          {category.name}
        </h1>
      </div>
      <CategoryForm
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || "",
          image: category.image || "",
          isActive: category.isActive,
        }}
      />
    </div>
  );
}
