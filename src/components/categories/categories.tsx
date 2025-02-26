import CategoryCard from "./CategoryCard";

interface CategoriesProps {
  categories: Category[];
}
const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 md:mx-0 mx-3 my-5">
      {categories.map((category) => {
        return <CategoryCard category={category} />;
      })}
    </div>
  );
};

export default Categories;
