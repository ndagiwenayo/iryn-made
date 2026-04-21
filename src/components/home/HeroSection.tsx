"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HERO_IMAGES_ROTATION } from "@/lib/instagram";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % HERO_IMAGES_ROTATION.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white">
      <div className="grid md:grid-cols-2 min-h-[80vh] md:min-h-[calc(100vh-140px)]">
        {/* Left - Text */}
        <div className="flex items-center justify-center px-6 md:px-16 py-16 bg-[#fafaf8] order-2 md:order-1">
          <div className="max-w-lg animate-slide-up">
            <p className="text-kicker text-[#8a8a8a] mb-6">
              Spring / Summer 2025
            </p>
            <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
              Wear the <br />
              <em className="italic text-[#b8953a]">Extraordinary</em>
            </h1>
            <p className="text-base md:text-lg text-[#3a3a3a] mb-10 leading-relaxed">
              Luxury fashion handcrafted in Rwanda. Discover bridal couture,
              designer pieces, and bespoke tailoring — available to purchase or
              rent.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#b8953a] transition-colors"
              >
                Shop New In
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/products?category=bridal-clothes"
                className="inline-flex items-center gap-2 border border-[#0a0a0a] text-[#0a0a0a] px-8 py-4 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#0a0a0a] hover:text-white transition-colors"
              >
                Shop Bridal
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Rotating photo */}
        <div className="relative overflow-hidden bg-[#0a0a0a] order-1 md:order-2">
          {HERO_IMAGES_ROTATION.map((img, i) => (
            <div
              key={img}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Subtle gradient for legibility of overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Corner label */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 text-white mix-blend-difference">
            <div className="border-t border-r border-white/40 w-16 md:w-24 h-16 md:h-24 relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#b8953a]" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white mix-blend-difference">
            N° 01 / 2025
          </div>

          {/* Rotation indicator */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2">
            {HERO_IMAGES_ROTATION.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] transition-all ${
                  i === current ? "w-10 bg-white" : "w-6 bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#e7e5e0] bg-white">
        {[
          { num: "01", label: "Free Shipping", sub: "Orders over RWF 200K" },
          { num: "02", label: "Designer Pieces", sub: "Curated collection" },
          { num: "03", label: "Custom Made", sub: "Bespoke orders welcome" },
          { num: "04", label: "Secure Payment", sub: "MTN MoMo verified" },
        ].map((item, i) => (
          <div
            key={item.num}
            className={`px-6 md:px-8 py-6 md:py-8 ${
              i < 3 ? "border-r border-[#e7e5e0]" : ""
            } ${i < 2 ? "border-b md:border-b-0 border-[#e7e5e0]" : ""}`}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#b8953a] mb-2">
              {item.num}
            </p>
            <p className="text-sm font-semibold mb-1">{item.label}</p>
            <p className="text-xs text-[#8a8a8a]">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
