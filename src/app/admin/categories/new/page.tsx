import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">New Category</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Add Category</h1>
      </div>
      <CategoryForm />
    </div>
  );
}
