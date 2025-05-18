"use client";

import PostList from "../posts/PostList";
import { Category } from "@/types/types";
import style from "@/components/categories/categories.module.css";
interface CategoryPostsProps {
  category: Category;
}
const CategoryPosts = ({ category }: CategoryPostsProps) => {
    
    const posts = category.posts
    
    return (
        <div className="container mx-auto">
            <h1 className={style.h1}>{category.name}</h1>
            <PostList posts={posts} />
        </div>
    )
};
export default CategoryPosts