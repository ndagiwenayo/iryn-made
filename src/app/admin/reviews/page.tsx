import prisma from "@/lib/prisma";
import ReviewRow from "@/components/admin/ReviewRow";
import { Star } from "lucide-react";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      product: { select: { name: true, slug: true } },
    },
    orderBy: [{ isApproved: "asc" }, { createdAt: "desc" }],
  });

  const pending = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Moderation</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Reviews</h1>
        <p className="text-[#8a8a8a] mt-3">
          {pending.length} pending · {approved.length} approved
        </p>
      </div>

      {pending.length > 0 && (
        <section className="mb-12">
          <h2 className="text-ui-small text-[#b8953a] mb-4">Pending Approval</h2>
          <div className="space-y-3">
            {pending.map((r) => (
              <ReviewRow
                key={r.id}
                review={{
                  id: r.id,
                  rating: r.rating,
                  title: r.title,
                  comment: r.comment,
                  isApproved: r.isApproved,
                  createdAt: r.createdAt.toISOString(),
                  user: r.user,
                  product: r.product,
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-ui-small text-[#0a0a0a] mb-4">Approved</h2>
        {approved.length === 0 ? (
          <p className="text-sm text-[#8a8a8a]">No approved reviews yet</p>
        ) : (
          <div className="space-y-3">
            {approved.map((r) => (
              <ReviewRow
                key={r.id}
                review={{
                  id: r.id,
                  rating: r.rating,
                  title: r.title,
                  comment: r.comment,
                  isApproved: r.isApproved,
                  createdAt: r.createdAt.toISOString(),
                  user: r.user,
                  product: r.product,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
