const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_URL}/api/v1/category`)
        if (!response.ok) throw new Error(`Ошибка: ${response.status} - ${response.statusText}`)
        const responseData = await response.json()
        return responseData.data
    } catch (error) {
        console.error('Ошибка при получении категорий' + error)
        throw new Error('категории не найдены')
    }
}

export const getCategory = async (id: number): Promise<Category> => {
    try {
        const response = await fetch(`${API_URL}/api/v1/category/${id}`)
        if (!response.ok) throw new Error(`Ошибка: ${response.status} - ${response.statusText}`)
        const responseData = await response.json()
        return responseData.data
    } catch (error) {
        console.error('Ошибка при получении категории' + error)
        throw new Error('категория не найдена')
    }
}