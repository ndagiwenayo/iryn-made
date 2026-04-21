"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { SerializedProductImage } from "@/types";

type Props = {
  images: SerializedProductImage[];
  productName: string;
};

function Placeholder() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#f5ede5] to-[#c8b896] flex items-center justify-center">
      <span className="font-editorial text-[200px] font-bold text-black/10 select-none">
        IM
      </span>
    </div>
  );
}

export default function ProductImageGallery({ images, productName }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const hasImages = images.length > 0;
  const current = images[selectedIdx];

  const next = () => setSelectedIdx((i) => (i + 1) % images.length);
  const prev = () => setSelectedIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="grid md:grid-cols-[80px_1fr] gap-4">
      {/* Thumbnails (desktop) */}
      {hasImages && images.length > 1 && (
        <div className="hidden md:flex flex-col gap-2 order-1">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setSelectedIdx(idx)}
              className={`aspect-[3/4] bg-[#f5f4f0] overflow-hidden transition-all ${
                idx === selectedIdx
                  ? "ring-1 ring-[#0a0a0a] ring-offset-2"
                  : "hover:opacity-80"
              }`}
            >
              <img
                src={img.imagePath}
                alt={img.altText || productName}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main */}
      <div className="order-2 md:col-start-2">
        <div className="relative aspect-[3/4] bg-[#f5f4f0] overflow-hidden group">
          {hasImages ? (
            <img
              src={current.imagePath}
              alt={current.altText || productName}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed(!zoomed)}
            />
          ) : (
            <Placeholder />
          )}

          {/* Arrows */}
          {hasImages && images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Zoom hint */}
          {hasImages && (
            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <ZoomIn className="w-3 h-3" /> {zoomed ? "Zoom Out" : "Zoom"}
            </div>
          )}
        </div>

        {/* Mobile thumbnail row */}
        {hasImages && images.length > 1 && (
          <div className="md:hidden flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedIdx(idx)}
                className={`w-16 h-20 shrink-0 bg-[#f5f4f0] overflow-hidden transition-all ${
                  idx === selectedIdx ? "ring-1 ring-[#0a0a0a]" : "opacity-60"
                }`}
              >
                <img
                  src={img.imagePath}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
