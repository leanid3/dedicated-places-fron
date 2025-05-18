import AdminPageBar from "@/components/admin/AdminPageBar";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setting = [
    { id: 1, name: "Edit", href: "/admin/posts/edit", isActive: false },
    { id: 2, name: "Create", href: "/admin/posts/create", isActive: false },
    { id: 3, name: "Delete", href: "/admin/posts/delete", isActive: false },
    { id: 4, name: "View", href: "/admin/posts/", isActive: true },
  ];

  return (
    <div className="overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4">
        <AdminPageBar setting={setting} />
        {children}
      </div>
    </div>
  );
}