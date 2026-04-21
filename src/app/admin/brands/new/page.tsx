import BrandForm from "@/components/admin/BrandForm";

export default function NewBrandPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">New Brand</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Add Brand</h1>
      </div>
      <BrandForm />
    </div>
  );
}
