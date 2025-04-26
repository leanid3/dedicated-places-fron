"use client";
import PostCard from "./PostCard";
import { Post } from "@/types/types";
import style from "./posts.module.css";

interface PostsProps {
  posts: Post[];
}
const PostList = ({ posts }: PostsProps) => {
  return (
    <div className={style.main}>
      {posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
