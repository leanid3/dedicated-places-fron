import { Post } from "@/types/types";
import RecomendPostCard from "./RecomendPostCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface RecomendSliderProps {
  posts: Post[];
}

const RecomendSlider = ({ posts }: RecomendSliderProps) => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index: number) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
       
        {posts.map((post) => (
          <RecomendPostCard key={post.post_id} post={post} />
        ))}
      </Slider>
    </div>
  );
};

export default RecomendSlider;
