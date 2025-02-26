import Categories from "@/components/categories/categories";
import { getCategories } from "@/lib/categories";

export default async function CategoriesPage(){
    const categories = await getCategories();
    return (
        <div className="">
            <Categories categories={categories}/>
        </div>
    );
}