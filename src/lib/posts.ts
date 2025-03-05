const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
    throw new Error('API_URL не определен');
}

export const getPost = async (post_id: number): Promise<Post> => {
    try {
        const response: Response = await fetch(`${API_URL}/api/v1/posts/${post_id}`)
        if (!response.ok) throw new Error(`Ошибка ${response.status} - ${response.statusText}`)
        const post = await response.json();
        return post.data
    } catch (e) {
        console.error('Ошибка при получении поста' + e)
        throw new Error('Пост не найден')
    }
}

export const getPosts = async (category_id: number) : Promise<Post[]> => {
    try {
        const response = await fetch(`${API_URL}/api/v1/posts?category=${category_id}`)
        if (!response.ok) throw new Error('посты не найдены')
        const posts =  await response.json()
        return posts.data
    } catch (e) {
        throw new Error('не удалось получить категорию')
    }
}

export const GetCustomQueryPosts = async () =>{
   const response = await fetch(`${API_URL}/api/v1/posts`)
    if(!response.ok) throw new Error('Посты не найдены')
    const posts = await response.json()
    return posts.data
}

/**
 * Поиск постов по названию, содержанию или тегам
 * @param query 
 * @param tags 
 * @returns 
 */
export const searchPosts = async (query?: string | null | undefined, tags?: string[] | null | undefined): Promise<Post[]> => {
    try {
        const params = new URLSearchParams();
        if (query) {
            params.append('query', query);
        }
        
        if (tags) {
            tags.forEach(tag => params.append('tags[]', tag));
        }

        const url = `${API_URL}/api/v1/search?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('посты не найдены');
        const post = await response.json();
        return post.data;
    } catch (e) {
        throw new Error('не удалось получить пост');
    }
};