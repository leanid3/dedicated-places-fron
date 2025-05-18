import AdminBar from "@/components/admin/AdminBar";
import AdminPageBar from "@/components/admin/AdminPageBar";
import CreatePostForm from "@/components/admin/post/create/createPostFrom";

const CreatePost = () => {
    const setting = [
        { id: 1, name: "Edit", href: "/admin/posts/edit", isActive: false },
        { id: 2, name: "Create", href: "/admin/posts/create", isActive: true },
        { id: 3, name: "Delete", href: "/admin/posts/delete", isActive: false },
    ]
    return (
        <div className="max-w-7xl mx-auto p-4">
            <AdminBar />
            <AdminPageBar setting={setting} />
            <h1 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-800 border-b border-gray-300 pb-4">Create Post</h1>
            <CreatePostForm />
        </div>
    );
};

export default CreatePost;