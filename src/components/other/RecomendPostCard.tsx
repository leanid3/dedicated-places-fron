"use client";
import { Post } from "@/types/types";

interface RecomendPostCardProps {
  post: Post;
}

const RecomendPostCard = ({ post }: RecomendPostCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mx-2 h-full transition-all duration-300 hover:shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 truncate">{post.title}</h3>
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
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-700 font-medium">
            График работы:{" "}
            <span className="text-gray-500 block mt-1">
              {post.status === "published"
                ? "пн-вс 09:00 - 18:00"
                : "Не указано"}
            </span>
          </p>
        </div>
      </div>
    </div>
  

  );
};
export default RecomendPostCard;
