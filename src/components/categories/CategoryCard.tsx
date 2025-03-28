"use client";
import Link from "next/link";

interface CategoryProps {
  category: Category;
}
const CategoryCard = ({ category }: CategoryProps) => {
  return (
    <div
      className="bg-amber-50 rounded-4xl border-2 border-amber-400 shadow-lg shadow-amber-400 "
      key={category.category_id}
    >
      <div className=" flex flex-col gap-3">
        <img
          className="w-full aspect-[4/3] object-cover"
          src="@/app/favicon.ico"
          alt={category.name}
        />
        <div className="p-10">
          <h1 className=" text-xl">
            <Link href={`/categories/${category.category_id}`}>
              {category.name}
            </Link>
          </h1>
          <p>{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
