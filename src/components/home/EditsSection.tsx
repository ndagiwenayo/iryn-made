import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HERO_IMAGES_ROTATION, LOOKBOOK_IMAGES } from "@/lib/instagram";

const edits = [
  {
    title: "The Bridal Edit",
    description: "For the most important day of your life",
    href: "/products?category=bridal-clothes",
    image: HERO_IMAGES_ROTATION[1],
  },
  {
    title: "The Ankara Collection",
    description: "Vibrant prints, contemporary cuts",
    href: "/products?category=women",
    image: LOOKBOOK_IMAGES[2],
  },
  {
    title: "Made to Measure",
    description: "Custom tailoring by our master designer",
    href: "/contact",
    image: HERO_IMAGES_ROTATION[3],
  },
  {
    title: "Last Chance",
    description: "Sale pieces before they're gone",
    href: "/products?sale=true",
    image: LOOKBOOK_IMAGES[7],
    accent: true,
  },
];

export default function EditsSection() {
  return (
    <section className="py-20 md:py-28 px-4 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-kicker text-[#b8953a] mb-3">The Edits</p>
          <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
            Shop by <em className="italic">Story</em>
          </h2>
          <p className="text-[#3a3a3a] mt-4 max-w-xl mx-auto">
            Curated collections for every occasion, style, and moment.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {edits.map((edit) => (
            <Link
              key={edit.title}
              href={edit.href}
              className="group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]"
            >
              <img
                src={edit.image}
                alt={edit.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white">
                {edit.accent && (
                  <span className="self-start text-[9px] tracking-[0.25em] uppercase px-2 py-1 bg-[#c23232] text-white font-bold mb-3">
                    Last Chance
                  </span>
                )}
                <h3 className="font-editorial text-xl md:text-2xl font-bold mb-1 leading-tight">
                  {edit.title}
                </h3>
                <p className="text-xs md:text-sm text-white/70 mb-3 md:mb-4">
                  {edit.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] md:text-xs tracking-[0.15em] uppercase font-semibold text-[#D4AF37] group-hover:gap-2 transition-all">
                  Shop Edit <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
