import { Post } from "@/types/types";
import RecomendPostCard from "./RecomendPostCard";

interface RecomendSliderProps  {
    posts:Post[]
}


const RecomendSlider = ({ posts }: RecomendSliderProps) => {
  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-auto overflow-hidden rounded-lg">
        {posts.map((post, index) => (
          <div
            key={post.post_id}
            className={`${
              index === 0 ? "block" : "hidden"
            } duration-700 ease-in-out`}
            data-carousel-item={index === 0 ? "active" : ""}
          >
            <div className="flex justify-center items-center">
              <RecomendPostCard post={post} />
            </div>
          </div>
        ))}
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
        {posts.map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-full bg-gray-300"
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default RecomendSlider;
