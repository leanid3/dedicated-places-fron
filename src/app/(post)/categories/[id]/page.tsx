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
    <div className="container mx-auto p-6"> 
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
        <p className="text-gray-600 mt-2">{category.description}</p>
      </div>
      {category ? (
        <CategoryPosts category={category} />
      ) : (
        <p>Посты не найдены</p>
      )}
    </div>
  );
};

export default CategoryPage;
