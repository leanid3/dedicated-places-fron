import CategoryPosts from "@/components/categories/CategoryPosts";
import { getCategory } from "@/lib/categories";

interface CategoryProps {
  params: Promise<{
    id: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryProps) => {
  const resolvedParams = await params;
  const category = await getCategory(Number(resolvedParams.id));

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
