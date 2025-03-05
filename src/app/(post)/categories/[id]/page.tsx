import CategoryPosts from "@/components/categories/CategoryPosts";
import { getCategory } from "@/lib/categories";

interface CategoryProps {
  params: {
    id: number;
  };
}

const CategoryPage = async ({ params }: CategoryProps) => {
  const category = await getCategory(params.id);

  return (
    <div>
      {category ? (
        <CategoryPosts category={category} />
      ) : (
        <p>Посты не найдены</p>
      )}
    </div>
  );
};

export default CategoryPage;
