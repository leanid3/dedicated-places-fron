const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getTags = async (): Promise<Tag[] | Error> =>{
    const response = await fetch(`${API_URL}/api/v1/tags`);
    if(!response.ok) return new Error('теги не найдены')
    const tags = await response.json()
    return tags.data
}