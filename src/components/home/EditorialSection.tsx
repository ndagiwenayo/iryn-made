import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EDITORIAL_RENT_IMAGE, EDITORIAL_CUSTOM_IMAGE } from "@/lib/instagram";

export default function EditorialSection() {
  return (
    <section className="px-4 lg:px-8 py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {/* Bridal Collection */}
          <Link
            href="/products?category=bridal-clothes"
            className="group relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[#0a0a0a]"
          >
            <img
              src={EDITORIAL_RENT_IMAGE}
              alt="Bridal Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 text-white">
              <p className="text-kicker text-[#D4AF37]">The Bridal Edit</p>
              <div>
                <h3 className="font-editorial text-4xl md:text-6xl font-bold mb-4 leading-[0.95]">
                  For your <em className="italic">most</em> <br />
                  special day
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Hand-picked, handcrafted bridal gowns designed for the
                  moments you&apos;ll remember forever.
                </p>
                <div className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-semibold group-hover:gap-3 transition-all">
                  Shop Bridal <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Custom */}
          <Link
            href="/contact"
            className="group relative aspect-[4/5] md:aspect-[4/5] overflow-hidden bg-[#0a0a0a]"
          >
            <img
              src={EDITORIAL_CUSTOM_IMAGE}
              alt="Custom made"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 text-white">
              <p className="text-kicker text-[#D4AF37]">Made to Measure</p>
              <div>
                <h3 className="font-editorial text-4xl md:text-6xl font-bold mb-4 leading-[0.95]">
                  Custom, <br />
                  <em className="italic text-[#D4AF37]">just for you</em>
                </h3>
                <p className="text-white/80 mb-6 max-w-md">
                  Work directly with our master tailor. Bespoke gowns,
                  tailored suits, and one-of-a-kind pieces crafted to your
                  exact measurements.
                </p>
                <div className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-semibold group-hover:gap-3 transition-all">
                  Book Consultation <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
