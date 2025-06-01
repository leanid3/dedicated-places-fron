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

  if (!category) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-lg text-red-500">Категория не найдена</p>
          </div>
        </div>
      </main>
    );
  }

  return <CategoryPosts category={category} />;
};

export default CategoryPage;
