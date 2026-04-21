import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const defaults = [
  // Business
  { key: "business_name", value: "IRYN Made", label: "Business Name", group: "business" },
  { key: "business_tagline", value: "Fashion Destination", label: "Tagline", group: "business" },
  { key: "business_location", value: "Kigali, Rwanda", label: "Location", group: "business" },
  { key: "business_address", value: "KG 718 St 19, Kigali, Rwanda 00000", label: "Full Address", group: "business" },

  // Contact
  { key: "contact_email", value: "irynmade@gmail.com", label: "Contact Email", group: "contact" },
  { key: "contact_phone", value: "+250 780 000 000", label: "Phone Number", group: "contact" },
  { key: "contact_whatsapp", value: "250780000000", label: "WhatsApp (digits only)", group: "contact" },
  { key: "contact_instagram", value: "irynmade", label: "Instagram handle", group: "contact" },

  // Payment
  { key: "momo_number", value: "+250 780 000 000", label: "MTN MoMo Number", group: "payment" },
  { key: "momo_name", value: "IRYN Made", label: "MoMo Account Name", group: "payment" },

  // Shipping
  { key: "free_shipping_threshold", value: "200000", label: "Free Shipping Threshold (RWF)", group: "shipping" },
  { key: "standard_shipping_fee", value: "5000", label: "Standard Shipping Fee (RWF)", group: "shipping" },

  // Homepage
  { key: "hero_kicker", value: "Spring / Summer 2025", label: "Hero Kicker Text", group: "homepage" },
  { key: "hero_title_line1", value: "Wear the", label: "Hero Title Line 1", group: "homepage" },
  { key: "hero_title_line2", value: "Extraordinary", label: "Hero Title Line 2 (italic)", group: "homepage" },
  {
    key: "hero_subtitle",
    value:
      "Luxury fashion handcrafted in Rwanda. Discover bridal couture, designer pieces, and bespoke tailoring — available to purchase or rent.",
    label: "Hero Subtitle",
    group: "homepage",
  },

  // Footer
  {
    key: "footer_description",
    value:
      "Luxury fashion handcrafted in Kigali, Rwanda. Celebrating African artistry through contemporary design.",
    label: "Footer Description",
    group: "homepage",
  },

  // Promo bar
  { key: "promo_message", value: "FREE SHIPPING ON ORDERS OVER RWF 200,000 | RENT DESIGNER PIECES", label: "Top Promo Bar", group: "homepage" },
];

async function main() {
  console.log("Seeding settings...");
  for (const s of defaults) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
    console.log(`✓ ${s.key}`);
  }
  console.log("Done");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
