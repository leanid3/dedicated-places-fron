"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/lib/hooks/useAuth";

const AdminBar = () => {
  const router = useRouter();
  const { checkAuth } = useAuth();
  const logout = async () => {
    localStorage.removeItem("access_token");
    await checkAuth(true);
    router.push("/login");
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/admin">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/posts">Posts</Link>
            <Link href="/admin/categories">Categories</Link>
            <Link href="/admin/tags">Tags</Link>
            <Link href="/admin/users">Users</Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminBar;
