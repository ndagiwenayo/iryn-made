import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LOOKBOOK_IMAGES } from "@/lib/instagram";

export default function Lookbook() {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-[#fafaf8]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
          <div>
            <p className="text-kicker text-[#b8953a] mb-3">The Lookbook</p>
            <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
              Style <em className="italic">Diary</em>
            </h2>
            <p className="text-[#3a3a3a] mt-4 max-w-xl">
              Moments from our studio and clients. Follow{" "}
              <a
                href="https://instagram.com/irynmade"
                target="_blank"
                rel="noopener"
                className="text-[#0a0a0a] font-semibold link-underline"
              >
                @irynmade
              </a>{" "}
              for daily inspiration.
            </p>
          </div>
          <a
            href="https://instagram.com/irynmade"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-semibold"
          >
            Follow on Instagram
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {LOOKBOOK_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`relative group overflow-hidden bg-[#f5f4f0] ${
                i === 0 || i === 5 ? "md:row-span-2 md:col-span-2 aspect-square" : "aspect-[3/4]"
              }`}
            >
              <img
                src={img}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
