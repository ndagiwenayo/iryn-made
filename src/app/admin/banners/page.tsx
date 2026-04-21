import Link from "next/link";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { Plus, Edit } from "lucide-react";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Homepage</p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Banners</h1>
        </div>
        <Link href="/admin/banners/new">
          <Button>
            <Plus className="w-4 h-4" /> Add Banner
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((b) => (
          <Link
            key={b.id}
            href={`/admin/banners/${b.id}/edit`}
            className="group border border-[#e7e5e0] bg-white overflow-hidden hover:border-[#0a0a0a] transition-colors"
          >
            <div className="aspect-[16/9] bg-[#f5f4f0] overflow-hidden">
              {b.imagePath ? (
                <img src={b.imagePath} alt={b.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#f5ede5] to-[#c8b896]" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold line-clamp-1">{b.title}</p>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold shrink-0 ${
                    b.isActive ? "text-green-700" : "text-[#c23232]"
                  }`}
                >
                  {b.isActive ? "Active" : "Hidden"}
                </span>
              </div>
              {b.subtitle && (
                <p className="text-xs text-[#8a8a8a] line-clamp-1">{b.subtitle}</p>
              )}
              <div className="flex items-center justify-between mt-3 text-[10px] tracking-wider uppercase text-[#3a3a3a]">
                <span>Order: {b.sortOrder}</span>
                <span className="text-[#b8953a] group-hover:underline">Edit →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {banners.length === 0 && (
        <div className="text-center py-16 border border-[#e7e5e0] bg-white">
          <p className="text-[#8a8a8a]">No banners yet</p>
        </div>
      )}
    </div>
  );
}
