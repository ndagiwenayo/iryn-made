"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, ShoppingBag, Search, User, Menu, X } from "lucide-react";
import MarqueeBar from "./MarqueeBar";

const navItems = [
  {
    label: "Women",
    href: "/products?category=women",
    mega: {
      columns: [
        {
          title: "Clothing",
          links: [
            { label: "Dresses", href: "/products?category=women" },
            { label: "Ankara Styles", href: "/products?category=women" },
            { label: "Tops & Blouses", href: "/products?category=women" },
            { label: "Suits & Blazers", href: "/products?category=women" },
          ],
        },
        {
          title: "Featured",
          links: [
            { label: "New In", href: "/products?category=women" },
            { label: "On Sale", href: "/products?category=women&sale=true" },
            { label: "Designer", href: "/products?category=women" },
            { label: "Custom Made", href: "/products?category=women" },
          ],
        },
      ],
    },
  },
  {
    label: "Men",
    href: "/products?category=men",
    mega: {
      columns: [
        {
          title: "Clothing",
          links: [
            { label: "Suits", href: "/products?category=men" },
            { label: "Shirts", href: "/products?category=men" },
            { label: "Casual", href: "/products?category=men" },
            { label: "Traditional", href: "/products?category=men" },
          ],
        },
        {
          title: "Featured",
          links: [
            { label: "Custom Tailoring", href: "/products?category=men" },
            { label: "On Sale", href: "/products?category=men&sale=true" },
            { label: "New In", href: "/products?category=men" },
          ],
        },
      ],
    },
  },
  {
    label: "Kids",
    href: "/products?category=kids",
    mega: null,
  },
  {
    label: "Bridal",
    href: "/products?category=bridal-clothes",
    mega: {
      columns: [
        {
          title: "Wedding Dresses",
          links: [
            { label: "Princess Style", href: "/products?category=bridal-clothes" },
            { label: "A-Line", href: "/products?category=bridal-clothes" },
            { label: "Mermaid", href: "/products?category=bridal-clothes" },
            { label: "Ball Gown", href: "/products?category=bridal-clothes" },
          ],
        },
        {
          title: "Featured",
          links: [
            { label: "Designer Collection", href: "/products?category=bridal-clothes" },
            { label: "Custom Bridal", href: "/contact" },
            { label: "New In", href: "/products?category=bridal-clothes" },
          ],
        },
      ],
    },
  },
  {
    label: "Bags",
    href: "/products?category=bags",
    mega: {
      columns: [
        {
          title: "Shop",
          links: [
            { label: "Handbags", href: "/products?category=bags" },
            { label: "Clutches", href: "/products?category=bags" },
            { label: "Crossbody", href: "/products?category=bags" },
            { label: "Totes", href: "/products?category=bags" },
          ],
        },
        {
          title: "Featured",
          links: [
            { label: "Designer", href: "/products?category=bags" },
            { label: "On Sale", href: "/products?category=bags&sale=true" },
          ],
        },
      ],
    },
  },
  { label: "Sale", href: "/products?sale=true", mega: null, highlight: true },
];

export default function Header({ promo }: { promo?: string }) {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : ""
        }`}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <MarqueeBar promo={promo} />

        <div className="border-b border-[#e7e5e0]">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 -ml-2"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/logo.jpg"
                  alt="IRYN Made"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shrink-0 ring-1 ring-[#e7e5e0]"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-editorial text-xl md:text-[22px] font-bold tracking-[0.15em]">
                    IRYN MADE
                  </span>
                  <span className="text-[9px] tracking-[0.4em] text-[#8a8a8a] uppercase mt-1">
                    Fashion Destination
                  </span>
                </div>
              </Link>

              {/* Icons */}
              <div className="flex items-center gap-1 md:gap-3">
                <Link
                  href="/products"
                  className="hidden sm:flex p-2 hover:bg-[#f5f4f0] transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link
                  href={session ? "/account" : "/auth/login"}
                  className="p-2 hover:bg-[#f5f4f0] transition-colors hidden sm:flex"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/account"
                  className="p-2 hover:bg-[#f5f4f0] transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/cart"
                  className="p-2 hover:bg-[#f5f4f0] transition-colors relative"
                  aria-label="Bag"
                >
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center justify-center gap-10 h-12 -mt-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="h-full flex items-center"
                  onMouseEnter={() => setHoveredNav(item.label)}
                >
                  <Link
                    href={item.href}
                    className={`text-[13px] tracking-[0.12em] uppercase font-medium h-full flex items-center border-b-2 transition-colors ${
                      hoveredNav === item.label
                        ? "border-[#0a0a0a]"
                        : "border-transparent"
                    } ${item.highlight ? "text-[#c23232]" : "text-[#0a0a0a]"}`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mega Menu */}
        {hoveredNav && (
          <div
            className="hidden md:block absolute left-0 right-0 top-full bg-white border-b border-[#e7e5e0] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] animate-slide-down"
            onMouseEnter={() => {}}
          >
            {(() => {
              const item = navItems.find((n) => n.label === hoveredNav);
              if (!item?.mega) return null;
              return (
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10">
                  <div className="grid grid-cols-4 gap-10">
                    {item.mega.columns.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-ui-small text-[#0a0a0a] mb-5">
                          {col.title}
                        </h3>
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
                    {/* Editorial promo tile */}
                    <Link
                      href={item.href}
                      className="block relative aspect-[3/4] bg-gradient-to-br from-[#f5f4f0] to-[#e7e5e0] overflow-hidden group"
                    >
                      <div className="absolute inset-0 flex items-end p-6">
                        <div>
                          <p className="text-ui-small text-[#8a8a8a] mb-2">
                            Shop {item.label}
                          </p>
                          <p className="font-editorial text-2xl font-bold">
                            Explore the <br />Collection →
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white animate-fade-in flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#e7e5e0]">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="IRYN Made"
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#e7e5e0]"
              />
              <div className="flex flex-col leading-none">
                <span className="font-editorial text-lg font-bold tracking-[0.15em]">
                  IRYN MADE
                </span>
                <span className="text-[8px] tracking-[0.4em] text-[#8a8a8a] uppercase mt-0.5">
                  Fashion Destination
                </span>
              </div>
            </div>
            <button onClick={() => setMobileMenu(false)} className="p-2 -mr-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-[#e7e5e0]">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`flex items-center justify-between px-5 py-5 text-base font-medium tracking-wider uppercase ${
                      item.highlight ? "text-[#c23232]" : "text-[#0a0a0a]"
                    }`}
                  >
                    {item.label}
                    <span className="text-[#8a8a8a]">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#e7e5e0] px-5 py-6 space-y-4 bg-[#fafaf8]">
              {session ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-3 text-sm"
                  >
                    <User className="w-5 h-5" strokeWidth={1.5} />
                    My Account
                  </Link>
                  {session.user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-3 text-sm text-[#b8953a] font-semibold"
                    >
                      Admin Dashboard →
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 text-sm"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                  Sign In / Register
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
