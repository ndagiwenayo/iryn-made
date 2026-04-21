const DEFAULT_ITEMS = [
  "Free shipping on orders over RWF 200,000",
  "Rent designer bridal pieces",
  "Made with love in Rwanda",
  "New Arrivals every week",
  "Custom tailoring available",
];

export default function MarqueeBar({ promo }: { promo?: string }) {
  const items = promo
    ? promo.split("|").map((x) => x.trim()).filter(Boolean)
    : DEFAULT_ITEMS;
  const display = [...items, ...items];

  return (
    <div className="bg-[#0a0a0a] text-white overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap py-2">
        {display.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] tracking-[0.3em] uppercase font-medium inline-flex items-center gap-8"
          >
            {item}
            <span className="text-[#D4AF37]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
