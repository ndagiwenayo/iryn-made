import Link from "next/link";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { Plus, Edit } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Organization</p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Categories</h1>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="w-4 h-4" /> Add Category
          </Button>
        </Link>
      </div>

      <div className="border border-[#e7e5e0] bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0] font-semibold">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-center p-4">Products</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-[#e7e5e0] last:border-0 hover:bg-[#fafaf8]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f5f4f0] overflow-hidden shrink-0">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#f5ede5] to-[#c8b896]" />
                      )}
                    </div>
                    <p className="font-medium">{c.name}</p>
                  </div>
                </td>
                <td className="p-4 text-[#3a3a3a] font-mono text-xs">{c.slug}</td>
                <td className="p-4 text-center">{c._count.products}</td>
                <td className="p-4 text-center">
                  {c.isActive ? (
                    <span className="text-green-700 text-[10px] uppercase tracking-wider font-semibold">Active</span>
                  ) : (
                    <span className="text-[#c23232] text-[10px] uppercase tracking-wider font-semibold">Hidden</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/categories/${c.id}/edit`}
                    className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold hover:text-[#b8953a]"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="text-center py-16 text-[#8a8a8a]">No categories yet</p>
        )}
      </div>
    </div>
  );
}
