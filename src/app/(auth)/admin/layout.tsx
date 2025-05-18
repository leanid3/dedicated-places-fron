import AdminBar from "@/components/admin/AdminBar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <AdminBar />
        {children}
    </div>
  );
}