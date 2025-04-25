"use client";

import Image from "next/image";
import { Post } from "@/types/types";
interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <article className="flex flex-col h-90 border-4 border-amber-500 rounded-3xl text-center mx-5 sm:mx-0 hover:shadow-xl focus:outline-2 focus:outline-offset-2">
      <div
        className="flex flex-3/5"
      />
      <div className="flex-2/5 flex flex-col p-5">
        <h4 className=" font-bold">{post.title}</h4>
        <p
          className={`${
            post.status == "published" ? ` text-green-500` : "text-red-500"
          }`}
        >
          {post.status}
        </p>
      </div>
    </article>
  );
};

export default PostCard;
