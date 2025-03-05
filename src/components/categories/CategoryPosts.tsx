"use client";

import PostList from "../posts/PostList";

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