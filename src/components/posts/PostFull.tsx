"use client";
import { Post } from "@/types/types";
import CommentsList from "../comments/CommentsList";

interface PostFullProps {
  post: Post;
}

const PostFull = ({ post }: PostFullProps) => {
    console.log(post.comments)
    return (
    <div className="container mx-auto p-6">
    {/* Заголовок и основная информация */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
      <p className="text-gray-600 mt-2">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-4">
        <span
          className={`text-sm font-medium ${
            post.status === "published" ? "text-green-500" : "text-red-500"
          }`}
        >
          {post.status === "published" ? "Опубликован" : "Не опубликован"}
        </span>
        {post.price !== null && (
          <span className="text-lg font-semibold text-gray-800">
            {post.price} ₽
          </span>
        )}
      </div>
    </div>

    {/* Основное изображение */}
    <div className="mb-8">
      <div className="h-64 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        <span className="text-gray-500">Изображение заведения</span>
      </div>
    </div>

    {/* Контент заведения */}
    <div className="prose max-w-none">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Описание</h2>
      <p>{post.content}</p>
    </div>

    {/* Теги */}
    {post.tags && post.tags.length > 0 && (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Теги:</h3>
        <ul className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag.tag_id}
              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
            >
              #{tag.name}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Комментарии */}
    {post.comments && post.comments.length > 0 && (
        <CommentsList comments={post.comments} comments_count={post.comment_count}/>
    )}
  </div>
  );
};
export default PostFull;
