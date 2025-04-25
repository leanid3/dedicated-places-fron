"use client";

import { Post } from "@/types/types";
import style from "./posts.module.css";
interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <article className={style.card}>
      <div className={style.left}>
        <div className={style.imgLeft}></div>
      </div>
      <div className={style.right}>
        <h2 className={style.h2}>{post.title}</h2>
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
