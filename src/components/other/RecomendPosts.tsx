"use client";
import { Post } from "@/types/types";
import style from "@/components/other/page.module.css";
import RecomendSlider from "./RecomendSlider";

interface RecomendPostsProps {
  posts: Post[];
}

const RecomendPosts = ({ posts }: RecomendPostsProps) => {
  return (
    <div>
      <div className="text-center">
        <h2 className={style.h2}>Популярные места</h2>
      </div>

      <RecomendSlider posts={posts} />
    </div>
  );
};

export default RecomendPosts;
