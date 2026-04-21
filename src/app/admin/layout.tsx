import { requireAdmin } from "@/lib/auth-helpers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid md:grid-cols-[240px_1fr] gap-10">
          <aside>
            <AdminSidebar />
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
