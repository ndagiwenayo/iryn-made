import Link from "next/link";
import { ArrowUpRight, Sparkles, Scissors, Heart, Award } from "lucide-react";

export const metadata = {
  title: "About | IRYN Made",
  description:
    "Discover the story behind IRYN Made - luxury Rwandan fashion crafted with love, celebrating traditional artistry and modern elegance.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="px-4 lg:px-8 py-20 md:py-32 bg-gradient-to-br from-[#faf6f0] via-[#e8dcc8] to-[#c8b896] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[20%] right-[10%] w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-[10%] left-[10%] w-96 h-96 rounded-full bg-[#b8953a]/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-kicker text-[#8a6a3a] mb-6">Our Story</p>
          <h1 className="font-editorial text-6xl md:text-8xl font-bold leading-[0.95] mb-8">
            Crafted in <br />
            <em className="italic text-[#b8953a]">Rwanda</em>
          </h1>
          <p className="text-lg md:text-xl text-[#3a3a3a] leading-relaxed max-w-2xl mx-auto">
            IRYN Made is more than a fashion destination &mdash; it&apos;s a
            celebration of Rwandan artistry, a commitment to exceptional
            craftsmanship, and a love letter to everyone who deserves to feel
            extraordinary.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-4 lg:px-8 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="aspect-square relative bg-gradient-to-br from-[#f5ede5] to-[#c8b896] overflow-hidden">
            <div className="absolute inset-6 border border-[#b8953a]/30" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div className="text-center">
                <img
                  src="/logo.jpg"
                  alt="IRYN Made"
                  className="w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full object-cover ring-4 ring-white shadow-2xl"
                />
                <h3 className="font-editorial text-3xl font-bold mt-8 tracking-[0.1em]">IRYN MADE</h3>
                <p className="text-kicker text-[#8a6a3a] mt-2">Fashion Destination</p>
                <p className="text-xs text-[#8a6a3a] mt-4 tracking-[0.5em] uppercase">Est. 2025</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-kicker text-[#b8953a] mb-4">Heritage</p>
            <h2 className="font-editorial text-4xl md:text-5xl font-bold mb-8 leading-[1.05]">
              Where tradition meets <em className="italic">modern luxury</em>
            </h2>
            <div className="space-y-5 text-[#3a3a3a] leading-relaxed">
              <p>
                Born in Kigali and stitched with love, IRYN Made emerged from a
                vision: to showcase the incredible talent of Rwandan artisans
                to the world while making luxury fashion accessible to our
                community.
              </p>
              <p>
                Every piece in our collection &mdash; from our signature bridal
                gowns to our everyday leather handbags &mdash; is a
                collaboration. Our designers work hand-in-hand with master
                tailors, seamstresses, and leatherworkers who&apos;ve spent
                decades perfecting their craft.
              </p>
              <p>
                We believe heritage and innovation aren&apos;t opposites.
                They&apos;re partners. Traditional beading techniques adorn
                contemporary gowns. Ankara-inspired prints meet modern
                silhouettes. The result? Fashion that tells a story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 lg:px-8 py-20 md:py-28 bg-[#fafaf8]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-kicker text-[#b8953a] mb-3">Our Values</p>
            <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1]">
              What We <em className="italic">Stand For</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Scissors, title: "Master Craftsmanship", desc: "Every stitch done by hand by our skilled artisans" },
              { icon: Sparkles, title: "Rwandan Heritage", desc: "Celebrating our culture through contemporary design" },
              { icon: Heart, title: "Made with Love", desc: "Each piece carries the passion of its maker" },
              { icon: Award, title: "Quality First", desc: "Premium materials and timeless construction" },
            ].map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white p-8 text-center border border-[#e7e5e0]"
                >
                  <Icon className="w-8 h-8 text-[#b8953a] mx-auto mb-5" strokeWidth={1.5} />
                  <h3 className="font-editorial text-xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#3a3a3a] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Designer */}
      <section className="px-4 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-kicker text-[#b8953a] mb-4">The Designer</p>
          <h2 className="font-editorial text-4xl md:text-6xl font-bold mb-8 leading-[1]">
            Behind every <em className="italic">piece</em>
          </h2>
          <p className="text-[#3a3a3a] leading-relaxed mb-6 text-lg">
            Our founder is a tailor and designer with a passion for creating
            garments that make you feel seen, celebrated, and beautiful. Whether
            you&apos;re looking for a bespoke bridal gown, a tailored suit for a
            special occasion, or advice on how to style a piece for your big
            day &mdash; we&apos;re here to help.
          </p>
          <p className="text-[#3a3a3a] leading-relaxed mb-10 text-lg">
            <span className="text-[#b8953a] font-semibold">
              Custom orders welcome. Design consultations available.
            </span>{" "}
            Every client is a collaborator.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-10 py-4 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#b8953a] transition-colors"
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="px-4 lg:px-8 py-20 md:py-28 bg-[#0a0a0a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-kicker text-[#b8953a] mb-4">The Collection</p>
          <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-[1] mb-8">
            Ready to <em className="italic text-[#b8953a]">shop</em>?
          </h2>
          <p className="text-white/70 leading-relaxed text-lg mb-10 max-w-2xl mx-auto">
            Explore our full collection of handcrafted pieces — from bridal
            couture to everyday elegance, each made with care in Rwanda.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 border border-white text-white px-10 py-4 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-white hover:text-[#0a0a0a] transition-colors"
          >
            Browse All Products <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
