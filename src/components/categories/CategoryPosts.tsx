"use client";

import PostList from "../posts/PostList";
import { Category } from "@/types/types";
interface CategoryPostsProps {
  category: Category;
}
const CategoryPosts = ({ category }: CategoryPostsProps) => {
    
    const posts = category.posts
    
    return (
        <div>
            <PostList posts={posts} />
        </div>
    )
};
export default CategoryPosts