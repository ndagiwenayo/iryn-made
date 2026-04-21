import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Map seeded product slugs to chosen IG image paths
const productImageMap: Record<string, string[]> = {
  "classic-leather-handbag": [
    "/images/instagram/DAa5Ql1oKME_0.jpg",
    "/images/instagram/DAa5Ql1oKME_1.jpg",
  ],
  "princess-wedding-dress": [
    "/images/instagram/DTc1eoyiAyL.jpg",
    "/images/instagram/DTc1oDliIQx.jpg",
  ],
  "elegant-evening-clutch": [
    "/images/instagram/DAa0-c-oV6s_0.jpg",
    "/images/instagram/DAa0-c-oV6s_1.jpg",
  ],
  "elegant-a-line-gown": [
    "/images/instagram/DTc1Ol3CLdF.jpg",
    "/images/instagram/DTc03RxCGek.jpg",
  ],
  "luxury-crossbody-bag": [
    "/images/instagram/DAa5Ql1oKME_1.jpg",
    "/images/instagram/DAa5Ql1oKME_0.jpg",
  ],
  "modern-mermaid-dress": [
    "/images/instagram/DTc0hPOiKgX.jpg",
    "/images/instagram/DAQzkmpIInL_0.jpg",
  ],
  "mens-tailored-suit": [
    "/images/instagram/DKYWGb0IEVM.jpg",
    "/images/instagram/DKYV7B1IK9s.jpg",
  ],
  "kids-party-dress": [
    "/images/instagram/DAa0pt8otn0_0.jpg",
    "/images/instagram/DAa0pt8otn0_1.jpg",
  ],
  "womens-cocktail-dress": [
    "/images/instagram/DAa5vUHICp0_0.jpg",
    "/images/instagram/DAa5vUHICp0_1.jpg",
  ],
  "womens-ankara-wrap-dress": [
    "/images/instagram/DAazvPAofbF_0.jpg",
    "/images/instagram/DAazvPAofbF_1.jpg",
  ],
  "mens-casual-linen-shirt": [
    "/images/instagram/DKYVhtfI4JD.jpg",
    "/images/instagram/DKYVJbvI1_U.jpg",
  ],
  "kids-school-uniform-set": [
    "/images/instagram/DAa0pt8otn0_2.jpg",
    "/images/instagram/DAa0pt8otn0_3.jpg",
  ],
  "designer-tote-bag": [
    "/images/instagram/DAa5i1bINzC_0.jpg",
    "/images/instagram/DAa5i1bINzC_1.jpg",
  ],
};

async function main() {
  console.log("Attaching Instagram photos to products...");

  for (const [slug, images] of Object.entries(productImageMap)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`⚠️  Product not found: ${slug}`);
      continue;
    }

    // Clear existing images for this product
    await prisma.productImage.deleteMany({ where: { productId: product.id } });

    // Add the new images
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imagePath: images[i],
          altText: product.name,
          isPrimary: i === 0,
          sortOrder: i,
        },
      });
    }

    console.log(`✓ ${slug} - ${images.length} image(s) attached`);
  }

  console.log("\nDone!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
