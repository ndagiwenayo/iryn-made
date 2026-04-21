import Link from "next/link";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { Plus, Edit } from "lucide-react";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Brands</p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Brands</h1>
        </div>
        <Link href="/admin/brands/new">
          <Button>
            <Plus className="w-4 h-4" /> Add Brand
          </Button>
        </Link>
      </div>

      <div className="border border-[#e7e5e0] bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0] font-semibold">
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Website</th>
              <th className="text-center p-4">Products</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-b border-[#e7e5e0] last:border-0 hover:bg-[#fafaf8]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#f5f4f0] overflow-hidden shrink-0">
                      {b.logo ? (
                        <img src={b.logo} alt={b.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#f5ede5] to-[#c8b896] flex items-center justify-center text-[10px] font-bold text-[#8a6a3a]">
                          {b.name[0]}
                        </div>
                      )}
                    </div>
                    <p className="font-medium">{b.name}</p>
                  </div>
                </td>
                <td className="p-4 text-[#3a3a3a] font-mono text-xs">{b.slug}</td>
                <td className="p-4 text-xs text-[#3a3a3a]">{b.website || "—"}</td>
                <td className="p-4 text-center">{b._count.products}</td>
                <td className="p-4 text-center">
                  {b.isActive ? (
                    <span className="text-green-700 text-[10px] uppercase tracking-wider font-semibold">Active</span>
                  ) : (
                    <span className="text-[#c23232] text-[10px] uppercase tracking-wider font-semibold">Hidden</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/brands/${b.id}/edit`}
                    className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold hover:text-[#b8953a]"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {brands.length === 0 && (
          <p className="text-center py-16 text-[#8a8a8a]">No brands yet</p>
        )}
      </div>
    </div>
  );
}
