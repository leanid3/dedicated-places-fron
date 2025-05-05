"use client";
import { Post } from "@/types/types";

interface RecomendPostCardProps {
  post: Post;
}

const RecomendPostCard = ({ post }: RecomendPostCardProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < 4 ? "bg-yellow-400" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-700 font-medium">
            Адрес:{" "}
            <span className="text-gray-500">
              {post.params.length > 0 ? post.params[0] : "Адрес не указан"}
            </span>
          </p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">
            График работы:{" "}
            <span className="text-gray-500">
              {post.status === "published" ? "пн-вс 09:00 - 18:00" : "Не указано"}
            </span>
          </p>
        </div>
      </div>
    </div>
    );
  };
export default RecomendPostCard;