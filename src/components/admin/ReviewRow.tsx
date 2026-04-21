"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Check, Trash2 } from "lucide-react";
import { approveReview, deleteReview } from "@/lib/actions/admin-settings";

type Props = {
  review: {
    id: number;
    rating: number;
    title: string | null;
    comment: string | null;
    isApproved: boolean;
    createdAt: string;
    user: { firstName: string; lastName: string; email: string };
    product: { name: string; slug: string };
  };
};

export default function ReviewRow({ review }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await approveReview(review.id);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this review?")) return;
    setLoading(true);
    await deleteReview(review.id);
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="border border-[#e7e5e0] bg-white p-5 flex gap-4 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < review.rating ? "fill-[#b8953a] text-[#b8953a]" : "text-[#e7e5e0]"}`}
              />
            ))}
          </div>
          <p className="text-sm font-medium">
            {review.user.firstName} {review.user.lastName}
          </p>
          <span className="text-xs text-[#8a8a8a]">•</span>
          <p className="text-xs text-[#8a8a8a]">
            on <span className="text-[#0a0a0a]">{review.product.name}</span>
          </p>
          <span className="text-xs text-[#8a8a8a]">•</span>
          <p className="text-xs text-[#8a8a8a]">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        {review.title && <h4 className="font-semibold text-sm mb-1">{review.title}</h4>}
        {review.comment && (
          <p className="text-sm text-[#3a3a3a] leading-relaxed">{review.comment}</p>
        )}
      </div>
      <div className="flex items-start gap-2 shrink-0">
        {!review.isApproved && (
          <button
            onClick={handleApprove}
            disabled={loading}
            className="inline-flex items-center gap-1 px-3 py-2 bg-green-600 text-white text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-green-700"
          >
            <Check className="w-3 h-3" /> Approve
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center gap-1 px-3 py-2 text-[#c23232] border border-[#c23232] text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-[#c23232] hover:text-white"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}
