"use client";
import { Post } from "@/types/types";
import style from "@/components/other/page.module.css";
import RecomendSlider from "./RecomendSlider";

interface RecomendPostsProps {
  posts: Post[];
}

const RecomendPosts = ({ posts }: RecomendPostsProps) => {
    return (
        <div className={style.popularPlaces}>
        <h2 className={style.h2}>Популярные места</h2>
        <div className={style.slider}>
          <div className={style.imageSlider}>
            <div className={style.arrows}>
              <div className={style.arrowLeft}>
                <div className={style.imgArrow}></div>
              </div>
              <div className={style.arrowRight}>
                <div className={style.imgArrow}></div>
              </div>
            </div>
          </div>
        <RecomendSlider posts={posts}/>
        </div>
      </div>
    );
  };

export default RecomendPosts;