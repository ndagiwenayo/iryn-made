import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit } from "lucide-react";
import Button from "@/components/ui/Button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: { take: 1, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Inventory</p>
          <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Products</h1>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="border border-[#e7e5e0] bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="text-[10px] text-[#8a8a8a] uppercase tracking-[0.15em] border-b border-[#e7e5e0] font-semibold">
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">Category</th>
              <th className="text-right p-4">Price</th>
              <th className="text-center p-4">Stock</th>
              <th className="text-center p-4">Type</th>
              <th className="text-center p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#e7e5e0] last:border-0 hover:bg-[#fafaf8]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-14 bg-[#f5f4f0] shrink-0 overflow-hidden">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].imagePath}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#f5ede5] to-[#c8b896]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.sku && (
                        <p className="text-[10px] text-[#8a8a8a] font-mono">
                          {product.sku}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-[#3a3a3a]">{product.category.name}</td>
                <td className="p-4 text-right">
                  {product.isOnSale && product.salePrice ? (
                    <div>
                      <p className="text-[#c23232] font-semibold">
                        {formatPrice(Number(product.salePrice))}
                      </p>
                      <p className="text-xs line-through text-[#8a8a8a]">
                        {formatPrice(Number(product.price))}
                      </p>
                    </div>
                  ) : (
                    <span className="font-medium">{formatPrice(Number(product.price))}</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <span className={product.stockQuantity < 5 ? "text-[#b8953a] font-semibold" : ""}>
                    {product.stockQuantity}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col gap-1 items-center">
                    {product.isRental && (
                      <span className="text-[9px] bg-[#0a0a0a] text-white px-2 py-0.5 tracking-wider uppercase font-semibold">
                        Rental
                      </span>
                    )}
                    {product.featured && (
                      <span className="text-[9px] bg-[#b8953a] text-white px-2 py-0.5 tracking-wider uppercase font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  {product.isActive ? (
                    <span className="text-green-700 text-[10px] uppercase tracking-wider font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-[#c23232] text-[10px] uppercase tracking-wider font-semibold">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold hover:text-[#b8953a]"
                  >
                    <Edit className="w-3 h-3" strokeWidth={1.5} /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center py-16 text-[#8a8a8a]">No products yet</p>
        )}
      </div>
    </div>
  );
}
