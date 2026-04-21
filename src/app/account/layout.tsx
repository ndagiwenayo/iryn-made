import Link from "next/link";
import { requireAuth } from "@/lib/auth-helpers";
import { User, ShoppingBag, LogOut } from "lucide-react";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  const navItems = [
    { href: "/account", label: "Profile", icon: User },
    { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="mb-10">
          <p className="text-kicker text-[#b8953a] mb-3">My Account</p>
          <h1 className="font-editorial text-5xl md:text-6xl font-bold leading-[1]">
            Welcome, {session.user.firstName}
          </h1>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-10">
          <aside>
            <nav className="sticky top-32">
              <ul className="border-l border-[#e7e5e0]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-[#3a3a3a] hover:text-[#0a0a0a] hover:bg-[#fafaf8] border-l-2 -ml-px border-transparent hover:border-[#0a0a0a] transition-colors"
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                {session.user.role === "admin" && (
                  <li className="border-t border-[#e7e5e0] mt-2 pt-2">
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-5 py-3 text-sm text-[#b8953a] font-semibold hover:bg-[#fafaf8] border-l-2 -ml-px border-transparent hover:border-[#b8953a] transition-colors"
                    >
                      Admin Dashboard →
                    </Link>
                  </li>
                )}
                <li className="border-t border-[#e7e5e0] mt-2 pt-2">
                  <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-[#c23232] hover:bg-[#fafaf8] border-l-2 -ml-px border-transparent hover:border-[#c23232] transition-colors"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={1.5} />
                    Sign Out
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
