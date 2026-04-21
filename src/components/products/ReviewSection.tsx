"use client";

import { Star } from "lucide-react";
import type { SerializedReview } from "@/types";

type Props = {
  productId: number;
  reviews: SerializedReview[];
  isLoggedIn: boolean;
};

export default function ReviewSection({ reviews }: Props) {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-20 md:mt-32 border-t border-[#e7e5e0] pt-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-kicker text-[#b8953a] mb-3">Customer Reviews</p>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold">
            What customers say
          </h2>
        </div>
        {reviews.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(avgRating)
                      ? "fill-[#b8953a] text-[#b8953a]"
                      : "text-[#e7e5e0]"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-[#3a3a3a]">
              {avgRating.toFixed(1)} · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-[#8a8a8a]">
          No reviews yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-t border-[#e7e5e0] pt-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f5f4f0] flex items-center justify-center text-xs font-semibold">
                    {review.user?.firstName?.[0]}
                    {review.user?.lastName?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {review.user?.firstName} {review.user?.lastName?.[0]}.
                    </p>
                    <div className="flex mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "fill-[#b8953a] text-[#b8953a]"
                              : "text-[#e7e5e0]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#8a8a8a]">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {review.title && (
                <h4 className="font-semibold mb-2 text-sm">{review.title}</h4>
              )}
              {review.comment && (
                <p className="text-sm text-[#3a3a3a] leading-relaxed">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
