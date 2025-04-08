import SearchForm from "@/components/SearchForm";
import style from "./page.module.css";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
export default async function Home() {
  return (
    <section>
      <div className={style.hop}>
        <h1 className={style.h1}>
          {" "}
          Найдите места, где <span className={style.yellow}>
            вам
          </span> будет <span className={style.yellow}>комфортно</span>
        </h1>
      </div>
      <SearchForm />
      <div className="container mx-auto grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center">
          <MapPinIcon className="h-12 w-12 mx-auto text-amber-400" />
          <h3 className="text-xl font-semibold mt-4">Находи</h3>
          <p>Заведения рядом с вами с фильтрами по типу доступности</p>
        </div>

        <div className="text-center">
          <ChatBubbleLeftIcon className="h-12 w-12 mx-auto text-amber-400" />
          <h3 className="text-xl font-semibold mt-4">Оценивай</h3>
          <p>Делитесь опытом через комментарии и рейтинги</p>
        </div>

        <div className="text-center">
          <HeartIcon className="h-12 w-12 mx-auto text-amber-400" />
          <h3 className="text-xl font-semibold mt-4">Помогай</h3>
          <p>Сообщайте о новых местах и изменениях в доступности</p>
        </div>
      </div>
    </section>
  );
}
