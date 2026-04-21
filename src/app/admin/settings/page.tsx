import prisma from "@/lib/prisma";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await prisma.setting.findMany({ orderBy: [{ group: "asc" }, { key: "asc" }] });

  return (
    <div>
      <div className="mb-10">
        <p className="text-kicker text-[#b8953a] mb-3">Configuration</p>
        <h1 className="font-editorial text-4xl md:text-5xl font-bold leading-[1]">Site Settings</h1>
        <p className="text-[#8a8a8a] mt-3">
          Control business name, contact info, payment number, and homepage copy
        </p>
      </div>

      <SettingsForm
        settings={settings.map((s) => ({
          id: s.id,
          key: s.key,
          value: s.value,
          label: s.label,
          group: s.group,
        }))}
      />
    </div>
  );
}
