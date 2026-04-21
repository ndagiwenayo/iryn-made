import { Truck, RefreshCw, Shield, Sparkles } from "lucide-react";

const promises = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On orders over RWF 200,000",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "14-day hassle-free return policy",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    desc: "MTN MoMo & verified checkout",
  },
  {
    icon: Sparkles,
    title: "Handcrafted",
    desc: "Made with love in Kigali",
  },
];

export default function ServicePromises() {
  return (
    <section className="px-4 lg:px-8 py-12 md:py-16 bg-white border-t border-[#e7e5e0]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {promises.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fafaf8] rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#b8953a]" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#8a8a8a] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
