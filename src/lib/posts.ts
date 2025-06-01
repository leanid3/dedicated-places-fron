import { StorePostFormData, UpdatePostFormData } from "@/types/forms";
import { Post } from "@/types/types";

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
        console.error('Ошибка при получении постов' + e)
        throw new Error('не удалось получить категорию')
    }
}

/**
 * Получаем посты по пагинации для администратора
 * @param page страница
 * @param limit количество постов на странице
 * @returns 
 */
export const getPostsPaginationAdmin = async (page: number, limit: number) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/admin/posts?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        if (!response.ok) throw new Error('посты не найдены')
        const posts = await response.json()
        return posts.data
    } catch (e) {
        console.error('Ошибка при получении постов' + e)
        throw new Error('не удалось получить посты')
    }
}


/**
 * Получаем посты по пагинации для пользователя
 * @param page страница
 * @param limit количество постов на странице
 * @returns 
 */
export const getPostsPaginationUser = async (page: number, limit: number) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/posts?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        if (!response.ok) throw new Error('посты не найдены')
        const posts = await response.json()
        return posts.data
    } catch (e) {
        console.error('Ошибка при получении постов' + e)
        throw new Error('не удалось получить посты')
    }
}


/**
 * Поиск постов по названию, содержанию или тегам
 * @param query поисковый запрос
 * @param tags теги
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
        console.error('Ошибка при поиске постов: ' + e);
        throw new Error('не удалось получить пост');
    }
};


/**
 * Создание поста
 * @param post пост
 * @returns 
 */
export const createPost = async (post: StorePostFormData) => {
    try {
        // Convert params to JSON string if it exists
        const postData = {
            ...post,
            params: post.params ? JSON.stringify(post.params) : undefined
        };

        const response = await fetch(`${API_URL}/api/v1/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(postData),
        });
        
        if (!response.ok && response.status !== 422) throw new Error('Не удалось создать пост');
        
        const createdPost = await response.json();
        
        if (createdPost.errors) {
            return createdPost;
        }
        
        return createdPost.data; 

    } catch (e) {
        console.error('Ошибка при создании поста:', e);
        throw new Error('Не удалось создать пост');
    }
}

/**
 * Обновление поста
 * @param postId id поста
 * @param post пост
 * @returns 
 */
export const updatePost = async (postId: number, UpdateData: UpdatePostFormData) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': window.location.origin,
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(UpdateData),
        });

        const updatedPost = await response.json();

        // ошибка валидации, если она существует
        if (updatedPost.errors) {
            return updatedPost;
        }

        
        if (!response.ok && response.status !== 422){ 
            console.error('Ошибка при обновлении поста:', updatedPost);
            throw new Error( 'status: ' + response.status + ' message: ' + response.statusText);
        }
    
        return updatedPost.data;
    } catch (e) {
        throw new Error(e as string);
    }
}

/**
 * Удаление поста
 * @param post_id id поста
 * @returns 
 */
export const deletePost = async (post_id: number) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        });
        if (!response.ok) throw new Error('не удалось удалить пост');
        const post = await response.json();
        return post.data;
    } catch (e) {
        console.error('Ошибка при удалении поста: ' + e);
        throw new Error('не удалось удалить пост');
    }
}



