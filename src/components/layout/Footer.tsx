import Link from "next/link";
import { getSettings } from "@/lib/settings";

export default async function Footer() {
  const s = await getSettings();
  const businessName = s.business_name || "IRYN MADE";
  const tagline = s.business_tagline || "Fashion Destination";
  const description = s.footer_description || "Luxury fashion handcrafted in Kigali, Rwanda. Celebrating African artistry through contemporary design.";
  const columns = [
    {
      title: "Shop",
      links: [
        { label: "Women", href: "/products?category=women" },
        { label: "Men", href: "/products?category=men" },
        { label: "Kids", href: "/products?category=kids" },
        { label: "Bridal", href: "/products?category=bridal-clothes" },
        { label: "Bags", href: "/products?category=bags" },
        { label: "Sale", href: "/products?sale=true" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Custom Orders", href: "/contact" },
        { label: "Size Guide", href: "/contact" },
        { label: "Shipping", href: "/contact" },
        { label: "Returns", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Story", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Press", href: "/contact" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "My Account", href: "/account" },
        { label: "Orders", href: "/account/orders" },
        { label: "FAQ", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-[#e7e5e0]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Top - Big Logo */}
        <div className="py-16 md:py-20 text-center border-b border-[#e7e5e0]">
          <img
            src="/logo.jpg"
            alt={businessName}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover mx-auto mb-6 ring-2 ring-[#e7e5e0] shadow-xl"
          />
          <p className="text-kicker text-[#b8953a] mb-4">
            {tagline}
          </p>
          <h2 className="font-editorial text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight uppercase">
            {businessName}
          </h2>
          <p className="text-sm text-[#8a8a8a] mt-6 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 py-14">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-ui-small text-[#0a0a0a] mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#3a3a3a] hover:text-[#0a0a0a] link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter mini */}
        <div className="border-t border-[#e7e5e0] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <p className="text-xs text-[#8a8a8a]">
              &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/contact" className="text-xs text-[#8a8a8a] hover:text-[#0a0a0a]">
                Privacy
              </Link>
              <Link href="/contact" className="text-xs text-[#8a8a8a] hover:text-[#0a0a0a]">
                Terms
              </Link>
              <Link href="/contact" className="text-xs text-[#8a8a8a] hover:text-[#0a0a0a]">
                Cookies
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#8a8a8a]">
            <span>Accepted:</span>
            <span className="font-semibold text-[#b8953a]">MTN MoMo</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
