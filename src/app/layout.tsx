import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/settings";
import { getSession } from "@/lib/auth-helpers";
import prisma from "@/lib/prisma";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IRYN Made | Fashion Destination",
  description:
    "Luxury fashion destination in Rwanda. Shop premium bags, bridal dresses, women's, men's & kids' clothing. Buy or rent designer pieces.",
  keywords:
    "fashion, Rwanda, bridal, bags, luxury, IRYN Made, Kigali, designer",
};

async function getCartCount() {
  try {
    const session = await getSession();
    if (!session?.user?.id) return 0;
    const items = await prisma.cartItem.findMany({
      where: { userId: Number(session.user.id) },
      select: { quantity: true },
    });
    return items.reduce((sum, i) => sum + i.quantity, 0);
  } catch {
    return 0;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, cartCount] = await Promise.all([
    getSettings(),
    getCartCount(),
  ]);

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-[#0a0a0a] antialiased">
        <Providers>
          <Header promo={settings.promo_message} cartCount={cartCount} />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
