import SearchForm from "@/components/SearchForm";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
export default async function Home() {
  return (
    <section>
      <div className="text-center py-10 px-4 sm:px-0">
        <h1 className="text-4xl font-bold ">
          {" "}
          Найдите места, где вам будет комфортно
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {" "}
          Каталог заведений с проверенной информацией о доступности для
          маломобильных граждан
        </p>
        <SearchForm/>
      </div>
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
