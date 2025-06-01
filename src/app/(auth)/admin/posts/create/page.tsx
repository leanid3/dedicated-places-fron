import CreatePostForm from "@/components/admin/post/create/createPostFrom";

const CreatePost = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 mt-4 text-center text-gray-800 border-b border-gray-300 pb-4">Create Post</h1>
            <CreatePostForm />
        </div>
    );
};

export default CreatePost;