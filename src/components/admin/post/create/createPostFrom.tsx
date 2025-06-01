'use client'
import { getTags } from "@/lib/tags";
import { getCategories } from "@/lib/categories";
import { Tag, Category } from "@/types/types";
import { useEffect, useState } from "react";
import { createPost } from "@/lib/posts";
import { StorePostFormData } from "@/types/forms";
import ErrorMessage from "@/components/template/input/errorMessage";
import ParamsInput from "@/components/template/input/paramsInput";
import { useRouter } from "next/navigation";
const CreatePostForm = () => {
    const [tags, setTags] = useState<Tag[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [postData, setPostData] = useState<StorePostFormData>({
        title: "",
        content: "",
        excerpt: "",
        slug: "",
        status: 'draft',
        type: 'post',
        stock: 0,
        price: 0,
        params: {} as Record<string, string>,
        locale: "ru",
        tags: [],
        category_id: 0,
        comment_status: 'open',
        photos: [],
        deleted_photos: [],
    });
    const [errors, setErrors] = useState({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        category_id: '',
        status: '',
        type: '',
        stock: '',
        price: '',
        locale: '',
        comment_status: '',
        params: '',
        slug: '',
        photos: '',
        deleted_photos: '',
    });
    const router = useRouter();
    const getCategoriesItems = async () => {
        const categories = await getCategories();
        setCategories(categories);
    }

    const getTagsItems = async () => {
        const tags = await getTags();
        setTags(tags);
    }

    useEffect(() => {
        getCategoriesItems();
        getTagsItems();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPostData(prev => ({
            ...prev,
            [name]: name === 'category_id' || name === 'user_id' ? Number(value) : value
        }));
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData(prev => ({ ...prev, [name]: value }));
    }

    const handleTagSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions);
        const selectedTagIds = options.map(option => Number(option.value));
        setPostData(prev => ({
            ...prev,
            tags: selectedTagIds
        }));
    }

    const handleCategorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPostData(prev => ({
            ...prev,
            category_id: Number(e.target.value)
        }));
    }

    const handleParamsChange = (params: Record<string, string>) => {
        setPostData(prev => ({
            ...prev,
            params
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await createPost(postData);
        if (response?.errors !== undefined) {
            Object.entries(response.errors).forEach(([key, value]) => {
                setErrors(prev => ({ ...prev, [key]: value }));
            });
        return
        }
        router.push('/admin/posts');
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md border border-gray-300">
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Название</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="title" name="title" value={postData.title} onChange={handleChange} />
                {errors.title && <ErrorMessage type="error" message={errors.title} />}
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2">Контент</label>
                <textarea className="border border-gray-300 rounded-md p-2 w-full" id="content" name="content" value={postData.content} onChange={handleTextareaChange} />
                {errors.content && <ErrorMessage type="error" message={errors.content} />}
            </div>
            <div className="mb-4">
                <label htmlFor="excerpt" className="block mb-2">Аннотация</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="excerpt" name="excerpt" value={postData.excerpt} onChange={handleChange} />
                {errors.excerpt && <ErrorMessage type="error" message={errors.excerpt} />}
            </div>
            <div className="mb-4">
                <label htmlFor="tags" className="block mb-2">Теги</label>
                <select 
                    className="border border-gray-300 rounded-md p-2 w-full"
                    id="tags" 
                    multiple 
                    name="tags" 
                    value={postData.tags?.map(tagId => tagId.toString()) || []}
                    onChange={handleTagSelectChange}
                >
                    {tags?.map((tag) => (
                        <option className="border border-gray-300 rounded-md p-2 w-full" key={tag.tag_id} value={tag.tag_id}>{tag.name}</option>
                    ))}
                </select>
                {errors.tags && <ErrorMessage type="error" message={errors.tags} />}
            </div>
            <div className="mb-4">
                <label htmlFor="category_id" className="block mb-2">Категория</label>
                <select 
                    className="border border-gray-300 rounded-md p-2 w-full"
                    id="category_id" 
                    name="category_id" 
                    value={postData.category_id}
                    onChange={handleCategorySelectChange}
                >
                    <option value={0}>Выберите категорию</option>
                    {categories?.map((category) => (
                        <option className="border border-gray-300 rounded-md p-2 w-full" key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
                </select>
                {errors.category_id && <ErrorMessage type="error" message={errors.category_id} />}
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block mb-2">Статус</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="status" name="status" value={postData.status} onChange={handleChange}>
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовано</option>
                </select>
                {errors.status && <ErrorMessage type="error" message={errors.status} />}
            </div>
            <div className="mb-4"> 
                <label htmlFor="type" className="block mb-2">Тип</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="type" name="type" value={postData.type} onChange={handleChange}>
                    <option value="post">Пост</option>
                    <option value="page">Страница</option>
                </select>
                {errors.type && <ErrorMessage type="error" message={errors.type} />}
            </div>
            <div className="mb-4">
                <label htmlFor="stock" className="block mb-2">Количество</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="number" id="stock" name="stock" value={postData.stock} onChange={handleChange} />
                {errors.stock && <ErrorMessage type="error" message={errors.stock} />}
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Цена</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="number" id="price" name="price" value={postData.price ?? 0} onChange={handleChange} />
                {errors.price && <ErrorMessage type="error" message={errors.price} />}
            </div>
            <div className="mb-4">  
                <label htmlFor="locale" className="block mb-2">Язык</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="locale" name="locale" value={postData.locale} onChange={handleChange} />
                {errors.locale && <ErrorMessage type="error" message={errors.locale} />}
            </div>
            <div className="mb-4">
                <label htmlFor="comment_status" className="block mb-2">Статус комментариев</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="comment_status" name="comment_status" value={postData.comment_status} onChange={handleChange}>
                    <option value="open">Открытый</option>
                    <option value="closed">Закрытый</option>
                </select>
                {errors.comment_status && <ErrorMessage type="error" message={errors.comment_status} />}
            </div>
            <div className="mb-4">
                <label className="block mb-2">Параметры</label>
                <ParamsInput
                    params={postData.params || {}}
                    onChange={handleParamsChange}
                    error={errors.params}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="photos" className="block mb-2">Фотографии</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="file" id="photos" name="photos" onChange={handleChange} />
                {errors.photos && <ErrorMessage type="error" message={errors.photos} />}
            </div>
            <div className="mb-4">
                <label htmlFor="slug" className="block mb-2">Ссылка</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="slug" name="slug" value={postData.slug} onChange={handleChange} />
                {errors.slug && <ErrorMessage type="error" message={errors.slug} />}
            </div>

            <button className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer" type="submit">Создать</button>
        </form>
    );
};

export default CreatePostForm;