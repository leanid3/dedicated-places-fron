"use client";

import { Post } from "@/types/types";
interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <article className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-full">
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">Изображение</span>
    </div>

    <div className="p-4 flex flex-col justify-between flex-grow">
      <h2 className="text-lg font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            post.status === "published" ? "text-green-500" : "text-red-500"
          }`}
        >
          {post.status === "published" ? "Опубликован" : "Не опубликован"}
        </span>
        {/* {post.price !== null && (
          <span className="text-sm font-semibold text-gray-800">
            {post.price} ₽
          </span>
        )} */}
      </div>

      <a
        href={`/places/${post.post_id}`}
        className="mt-4 inline-block text-blue-500 hover:underline text-sm"
      >
        Подробнее
      </a>
    </div>
  </article>
  );
};

export default PostCard;
