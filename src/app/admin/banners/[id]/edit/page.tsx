import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BannerForm from "@/components/admin/BannerForm";

type Params = Promise<{ id: string }>;

export default async function EditBannerPage({ params }: { params: Params }) {
  const { id } = await params;
  const banner = await prisma.banner.findUnique({ where: { id: Number(id) } });
  if (!banner) notFound();

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Edit Banner</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">{banner.title}</h1>
      </div>
      <BannerForm
        banner={{
          id: banner.id,
          title: banner.title,
          subtitle: banner.subtitle || "",
          imagePath: banner.imagePath,
          linkUrl: banner.linkUrl || "",
          buttonText: banner.buttonText || "",
          sortOrder: banner.sortOrder,
          isActive: banner.isActive,
        }}
      />
    </div>
  );
}
