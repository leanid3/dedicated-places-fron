"use client";
import PostCard from "./PostCard";
import { Post } from "@/types/types";

interface PostsProps {
  posts: Post[];
}
const PostList = ({ posts }: PostsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
