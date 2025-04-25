import { Tag } from "@/types/types";
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getTags = async (): Promise<Tag[]> =>{
   try {
    const response = await fetch(`${API_URL}/api/v1/tags`);
    if(!response.ok) throw new Error('теги не найдены')
    const tags = await response.json()
    return tags.data
    
   } catch (error) {
    console.error("Ошибка при получении тегов" + error);
    throw new Error("Теги не найдены");
   }
}