"use client";

import PostList from "../posts/PostList";
import { Category } from "@/types/types";

interface CategoryPostsProps {
  category: Category;
}

const CategoryPosts = ({ category }: CategoryPostsProps) => {
  const posts = category.posts;
  
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          {category.name}
        </h1>
        {posts && posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-lg text-gray-600">Посты в этой категории не найдены</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPosts;