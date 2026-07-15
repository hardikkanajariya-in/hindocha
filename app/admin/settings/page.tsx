import { getSettings } from "@/lib/queries/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your shop configuration</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
