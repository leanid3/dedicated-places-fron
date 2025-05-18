import SearchForm from "@/components/SearchForm";
import Team from "@/components/team/Team";
import style from "./page.module.css";
import RecomendPosts from "@/components/other/RecomendPosts";
import { getCategory } from "@/lib/categories";
export default async function Home() {
  
  const randNumber = getRandomNumber(1, 20);
  const recommendedPosts = await getCategory(randNumber);
  
  return (
    <section>
      <div className={style.hop}>
        <h1 className={style.h1}>
          {" "}
          Мир, в котором <span className={style.yellow}>удобно всем</span>
        </h1>
        <div className={style.imgHop}></div>
      </div>
      <SearchForm />
      <RecomendPosts posts={recommendedPosts.posts} />
      <Team/>
    </section>
  );
}
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}