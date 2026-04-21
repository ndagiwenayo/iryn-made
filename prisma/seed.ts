import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // --- Admin User ---
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@irynmade.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@irynmade.com",
      passwordHash: adminPassword,
      firstName: "Iryn",
      lastName: "Admin",
      phone: "+250780000000",
      role: "admin",
      city: "Kigali",
    },
  });
  console.log(`Admin user: ${admin.email}`);

  // --- Demo Customer ---
  const customerPassword = await hash("customer123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      username: "customer",
      email: "customer@example.com",
      passwordHash: customerPassword,
      firstName: "Marie",
      lastName: "Uwimana",
      phone: "+250781234567",
      role: "customer",
      city: "Kigali",
    },
  });
  console.log(`Demo customer: ${customer.email}`);

  // --- Brand ---
  const brand = await prisma.brand.upsert({
    where: { slug: "iryn-made" },
    update: {},
    create: {
      name: "IRYN Made",
      slug: "iryn-made",
      description: "Luxury fashion crafted in Rwanda. Blending traditional techniques with contemporary style.",
      website: "https://irynmade.com",
      isActive: true,
    },
  });

  // --- Categories ---
  const categoriesData = [
    { name: "Women", slug: "women", description: "Elegant styles for the modern woman" },
    { name: "Men", slug: "men", description: "Sharp looks and tailored pieces for men" },
    { name: "Kids", slug: "kids", description: "Fun and fashionable clothing for children" },
    { name: "Bridal", slug: "bridal-clothes", description: "Your perfect day deserves the perfect dress" },
    { name: "Bags", slug: "bags", description: "Luxury handbags and accessories" },
  ];

  const categories: Record<string, any> = {};
  for (const cat of categoriesData) {
    categories[cat.slug] = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`Categories: ${Object.keys(categories).join(", ")}`);

  // --- Products ---
  const productsData = [
    {
      name: "Classic Leather Handbag",
      slug: "classic-leather-handbag",
      description: "A timeless leather handbag crafted by Rwandan artisans. Features premium stitching, gold-tone hardware, and a spacious interior with multiple compartments. Perfect for both everyday elegance and special occasions.",
      shortDescription: "Timeless leather handbag with gold-tone hardware",
      categorySlug: "bags",
      price: 150000,
      salePrice: 120000,
      isOnSale: true,
      discountPercentage: 20,
      stockQuantity: 15,
      featured: true,
      sku: "BAG-CLH-001",
    },
    {
      name: "Princess Wedding Dress",
      slug: "princess-wedding-dress",
      description: "A breathtaking princess-style wedding dress featuring intricate lace detailing, a sweetheart neckline, and a dramatic cathedral-length train. Hand-embroidered with delicate beadwork by our master artisans.",
      shortDescription: "Breathtaking princess-style gown with cathedral train",
      categorySlug: "bridal-clothes",
      price: 800000,
      salePrice: 600000,
      isOnSale: true,
      discountPercentage: 25,
      isRental: true,
      rentalPrice: 150000,
      stockQuantity: 3,
      isDesigner: true,
      featured: true,
      sku: "BRI-PWD-001",
    },
    {
      name: "Elegant Evening Clutch",
      slug: "elegant-evening-clutch",
      description: "A stunning evening clutch adorned with hand-sewn crystals. Features a detachable gold chain strap and satin-lined interior. The perfect accessory for galas, weddings, and formal events.",
      shortDescription: "Crystal-adorned evening clutch with gold chain",
      categorySlug: "bags",
      price: 120000,
      salePrice: 96000,
      isOnSale: true,
      discountPercentage: 20,
      stockQuantity: 20,
      featured: true,
      sku: "BAG-EEC-001",
    },
    {
      name: "Elegant A-Line Gown",
      slug: "elegant-a-line-gown",
      description: "A sophisticated A-line wedding gown with off-shoulder sleeves and delicate floral appliques. The fitted bodice flows into a graceful skirt with layers of soft tulle. Available for purchase or rental.",
      shortDescription: "Sophisticated A-line gown with floral appliques",
      categorySlug: "bridal-clothes",
      price: 750000,
      salePrice: 562500,
      isOnSale: true,
      discountPercentage: 25,
      isRental: true,
      rentalPrice: 120000,
      stockQuantity: 4,
      isDesigner: true,
      featured: true,
      sku: "BRI-AAG-001",
    },
    {
      name: "Luxury Crossbody Bag",
      slug: "luxury-crossbody-bag",
      description: "A versatile crossbody bag made from premium leather with an adjustable strap. Features our signature gold clasp and quilted pattern. Compact yet spacious enough for daily essentials.",
      shortDescription: "Premium leather crossbody with signature gold clasp",
      categorySlug: "bags",
      price: 140000,
      salePrice: 112000,
      isOnSale: true,
      discountPercentage: 20,
      stockQuantity: 12,
      sku: "BAG-LCB-001",
    },
    {
      name: "Modern Mermaid Dress",
      slug: "modern-mermaid-dress",
      description: "A show-stopping mermaid silhouette wedding dress with intricate beading along the bodice and a dramatic flared skirt. Features a low back design and chapel-length train.",
      shortDescription: "Show-stopping mermaid silhouette with beaded bodice",
      categorySlug: "bridal-clothes",
      price: 900000,
      salePrice: 675000,
      isOnSale: true,
      discountPercentage: 25,
      isRental: true,
      rentalPrice: 180000,
      stockQuantity: 2,
      isDesigner: true,
      featured: true,
      sku: "BRI-MMD-001",
    },
    {
      name: "Men's Tailored Suit",
      slug: "mens-tailored-suit",
      description: "A meticulously tailored suit crafted from premium wool blend fabric. Features a slim-fit silhouette, notch lapels, and hand-finished details. Custom sizing available upon request.",
      shortDescription: "Premium wool blend slim-fit suit with hand-finished details",
      categorySlug: "men",
      price: 350000,
      stockQuantity: 8,
      isCustom: true,
      featured: true,
      sku: "MEN-MTS-001",
    },
    {
      name: "Kids Party Dress",
      slug: "kids-party-dress",
      description: "An adorable party dress for little girls featuring a sparkly bodice and layered tulle skirt. Perfect for birthdays, weddings, and special celebrations. Available in multiple colors.",
      shortDescription: "Sparkly bodice with layered tulle skirt",
      categorySlug: "kids",
      price: 85000,
      stockQuantity: 25,
      sku: "KID-KPD-001",
    },
    {
      name: "Women's Cocktail Dress",
      slug: "womens-cocktail-dress",
      description: "A stunning cocktail dress with a fitted silhouette and elegant draping. Made from luxurious crepe fabric with subtle sheen. Features a flattering V-neckline and knee-length hemline.",
      shortDescription: "Fitted crepe cocktail dress with elegant draping",
      categorySlug: "women",
      price: 250000,
      stockQuantity: 10,
      featured: true,
      sku: "WOM-WCD-001",
    },
    {
      name: "Women's Ankara Wrap Dress",
      slug: "womens-ankara-wrap-dress",
      description: "A vibrant Ankara print wrap dress celebrating African textile traditions. Features a flattering wrap silhouette, flutter sleeves, and a self-tie belt. Made from premium wax print cotton.",
      shortDescription: "Vibrant Ankara print wrap dress with flutter sleeves",
      categorySlug: "women",
      price: 180000,
      salePrice: 144000,
      isOnSale: true,
      discountPercentage: 20,
      stockQuantity: 15,
      sku: "WOM-AWD-001",
    },
    {
      name: "Men's Casual Linen Shirt",
      slug: "mens-casual-linen-shirt",
      description: "A relaxed-fit linen shirt perfect for Kigali's warm climate. Features a mandarin collar, rolled-up sleeve tabs, and premium mother-of-pearl buttons. Breathable and stylish.",
      shortDescription: "Relaxed-fit linen shirt with mandarin collar",
      categorySlug: "men",
      price: 95000,
      stockQuantity: 20,
      sku: "MEN-CLS-001",
    },
    {
      name: "Kids School Uniform Set",
      slug: "kids-school-uniform-set",
      description: "A complete school uniform set including shirt, shorts/skirt, and tie. Made from durable, easy-care fabric that withstands daily wear. Available in standard school colors.",
      shortDescription: "Complete durable school uniform set",
      categorySlug: "kids",
      price: 45000,
      stockQuantity: 50,
      sku: "KID-SUS-001",
    },
    {
      name: "Designer Tote Bag",
      slug: "designer-tote-bag",
      description: "A spacious designer tote bag crafted from supple leather with woven African-inspired accents. Features reinforced handles, magnetic closure, and interior organization pockets.",
      shortDescription: "Spacious leather tote with African-inspired accents",
      categorySlug: "bags",
      price: 200000,
      stockQuantity: 8,
      isDesigner: true,
      featured: true,
      sku: "BAG-DTB-001",
    },
  ];

  for (const productData of productsData) {
    const { categorySlug, ...data } = productData;
    const category = categories[categorySlug];

    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        categoryId: category.id,
        brandId: brand.id,
      },
    });
  }
  console.log(`Products: ${productsData.length} seeded`);

  // --- Banners ---
  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      {
        title: "New Bridal Collection 2025",
        subtitle: "Discover our handcrafted wedding dresses. Buy or rent your dream gown.",
        imagePath: "/images/banners/bridal-hero.jpg",
        linkUrl: "/products?category=bridal-clothes",
        buttonText: "Shop Bridal",
        isActive: true,
        sortOrder: 1,
      },
      {
        title: "Luxury Bags Collection",
        subtitle: "Handcrafted leather bags that blend Rwandan artistry with modern design.",
        imagePath: "/images/banners/bags-hero.jpg",
        linkUrl: "/products?category=bags",
        buttonText: "Shop Bags",
        isActive: true,
        sortOrder: 2,
      },
    ],
  });
  console.log("Banners seeded");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
