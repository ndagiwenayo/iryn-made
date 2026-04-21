"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  Tag,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  Settings,
} from "lucide-react";
import { clsx } from "clsx";

const mainNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

const catalogNav = [
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/brands", label: "Brands", icon: Briefcase },
];

const contentNav = [
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
];

const systemNav = [
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function NavSection({
  items,
  pathname,
  label,
}: {
  items: { href: string; label: string; icon: any; exact?: boolean }[];
  pathname: string;
  label?: string;
}) {
  return (
    <>
      {label && (
        <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a8a8a] px-5 mt-6 mb-2 font-semibold">
          {label}
        </p>
      )}
      <ul>
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-5 py-2.5 text-sm transition-colors border-l-2 -ml-px",
                  active
                    ? "text-[#0a0a0a] font-semibold bg-[#fafaf8] border-[#0a0a0a]"
                    : "text-[#3a3a3a] hover:text-[#0a0a0a] hover:bg-[#fafaf8] border-transparent hover:border-[#0a0a0a]"
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-32">
      <p className="text-kicker text-[#b8953a] mb-3 px-5">Admin Panel</p>
      <div className="border-l border-[#e7e5e0]">
        <NavSection items={mainNav} pathname={pathname} />
        <NavSection items={catalogNav} pathname={pathname} label="Catalog" />
        <NavSection items={contentNav} pathname={pathname} label="Content" />
        <NavSection items={systemNav} pathname={pathname} label="System" />
      </div>
      <div className="border-t border-[#e7e5e0] mt-4 pt-2 ml-px border-l">
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#3a3a3a] hover:text-[#0a0a0a] hover:bg-[#fafaf8] border-l-2 -ml-px border-transparent hover:border-[#0a0a0a] transition-colors"
        >
          ← Back to Store
        </Link>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#c23232] hover:bg-[#fafaf8] border-l-2 -ml-px border-transparent hover:border-[#c23232] transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
