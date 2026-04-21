"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_IMAGES_ROTATION } from "@/lib/instagram";

const slides = [
  {
    kicker: "Spring / Summer 2025",
    titleLine1: "Wear the",
    titleLine2Italic: "Extraordinary",
    subtitle:
      "Luxury fashion handcrafted in Rwanda. Discover bridal couture, designer bags, and bespoke tailoring.",
    cta1: { label: "Shop New In", href: "/products" },
    cta2: { label: "Shop Bridal", href: "/products?category=bridal-clothes" },
    image: HERO_IMAGES_ROTATION[0],
  },
  {
    kicker: "Bridal Edit",
    titleLine1: "Your perfect",
    titleLine2Italic: "moment",
    subtitle:
      "Hand-embroidered gowns crafted for the day you've been dreaming of.",
    cta1: { label: "Shop Bridal", href: "/products?category=bridal-clothes" },
    cta2: { label: "Custom Orders", href: "/contact" },
    image: HERO_IMAGES_ROTATION[1],
  },
  {
    kicker: "Contemporary",
    titleLine1: "Modern",
    titleLine2Italic: "silhouettes",
    subtitle:
      "Ready-to-wear pieces that blend tradition with fresh design.",
    cta1: { label: "Shop Women", href: "/products?category=women" },
    cta2: { label: "View All", href: "/products" },
    image: HERO_IMAGES_ROTATION[2],
  },
  {
    kicker: "Made in Rwanda",
    titleLine1: "Crafted with",
    titleLine2Italic: "love",
    subtitle: "Every piece tells a story. Every stitch carries care.",
    cta1: { label: "Our Story", href: "/about" },
    cta2: { label: "Shop All", href: "/products" },
    image: HERO_IMAGES_ROTATION[3],
  },
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const next = () => setIdx((i) => (i + 1) % slides.length);
  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 2000);
  };

  return (
    <section
      className="relative bg-[#0a0a0a] text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] max-h-[85vh] overflow-hidden">
        {/* Sliding track */}
        <div
          className="absolute inset-0 flex transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
          style={{
            transform: `translateX(-${(idx * 100) / slides.length}%)`,
            width: `${slides.length * 100}%`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative shrink-0 h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              <img
                src={slide.image}
                alt={slide.titleLine1}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 30%" }}
                draggable={false}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end md:items-center">
                <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 pb-10 md:pb-0">
                  <div
                    className={`max-w-xl ${
                      i === idx ? "animate-slide-up" : "opacity-0"
                    }`}
                    key={`content-${idx}-${i}`}
                  >
                    <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-4 md:mb-6">
                      {slide.kicker}
                    </p>
                    <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-4 md:mb-6">
                      {slide.titleLine1} <br />
                      <em className="italic text-[#D4AF37]">
                        {slide.titleLine2Italic}
                      </em>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 md:mb-10 max-w-lg leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      <Link
                        href={slide.cta1.href}
                        className="group inline-flex items-center gap-2 bg-white text-black px-5 py-3 md:px-8 md:py-4 text-[10px] md:text-xs tracking-[0.15em] uppercase font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors"
                      >
                        {slide.cta1.label}
                        <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                      <Link
                        href={slide.cta2.href}
                        className="inline-flex items-center gap-2 border border-white text-white px-5 py-3 md:px-8 md:py-4 text-[10px] md:text-xs tracking-[0.15em] uppercase font-semibold hover:bg-white hover:text-black transition-colors"
                      >
                        {slide.cta2.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-sm items-center justify-center transition-colors z-10 rounded-full"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
        </button>
        <button
          onClick={next}
          className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-sm items-center justify-center transition-colors z-10 rounded-full"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1 rounded-full transition-all ${
                i === idx ? "w-8 bg-[#D4AF37]" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] md:text-xs tracking-[0.3em] text-white/60 font-mono z-10">
          {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Bottom USP strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 bg-[#0a0a0a]">
        {[
          { num: "01", label: "Free Shipping", sub: "Orders over RWF 200K" },
          { num: "02", label: "Designer Pieces", sub: "Curated collection" },
          { num: "03", label: "Custom Made", sub: "Bespoke orders welcome" },
          { num: "04", label: "Secure Payment", sub: "MTN MoMo verified" },
        ].map((item, i) => (
          <div
            key={item.num}
            className={`px-4 sm:px-6 md:px-8 py-5 md:py-8 ${
              i < 3 ? "md:border-r border-white/10" : ""
            } ${i % 2 === 0 ? "border-r md:border-r border-white/10" : ""} ${
              i < 2 ? "border-b md:border-b-0 border-white/10" : ""
            }`}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] mb-2">
              {item.num}
            </p>
            <p className="text-xs md:text-sm font-semibold mb-1 text-white">
              {item.label}
            </p>
            <p className="text-[10px] md:text-xs text-white/50">{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
