import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
