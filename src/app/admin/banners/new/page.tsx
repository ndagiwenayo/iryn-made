import BannerForm from "@/components/admin/BannerForm";

export default function NewBannerPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">New Banner</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Add Banner</h1>
      </div>
      <BannerForm />
    </div>
  );
}
