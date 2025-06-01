'use client'
import { getTags } from "@/lib/tags";
import { getCategories } from "@/lib/categories";
import { Post, Tag, Category } from "@/types/types";
import { useEffect, useState } from "react";
import { updatePost } from "@/lib/posts";
import { UpdatePostFormData } from "@/types/forms";
import ErrorMessage from "@/components/template/input/errorMessage";

const EditPostForm = ({post}: {post: Post}) => {
    const [tags, setTags] = useState<Tag[] | null>(post.tags as Tag[]);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [postData, setPostData] = useState<UpdatePostFormData>({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        slug: post.slug,
        status: post.status,
        type: post.type,
        stock: post.stock,
        price: Number(post.price),
        params: post.params as Record<string, string> || {},
        locale: post.locale,
        tags: Array.isArray(post.tags) 
            ? post.tags.map(tag => typeof tag === 'object' ? tag.tag_id : tag)
            : [],
        category_id: post.category_id,
        comment_status: post.comment_status,
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
    });

    const [paramsData, setParamsData] = useState<Record<string, string>>(post.params ? post.params as Record<string, string> : {});

    const handleParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParamsData(prev => ({ ...prev, [name]: value }));
    }

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
    useEffect(() => {
        setPostData(prev => ({
            ...prev,
            params: paramsData
        }));
    }, [paramsData]);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await updatePost(post.post_id, postData as UpdatePostFormData);
        if (response?.errors !== undefined) {
            Object.entries(response.errors).forEach(([key, value]) => {
                setErrors(prev => ({ ...prev, [key]: value }));
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md border border-gray-300">
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Title</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="title" name="title" value={postData.title} onChange={handleChange} />
                {errors.title && <ErrorMessage type="error" message={errors.title} />}
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2">Content</label>
                <textarea className="border border-gray-300 rounded-md p-2 w-full" id="content" name="content" value={postData.content} onChange={handleTextareaChange} />
                {errors.content && <ErrorMessage type="error" message={errors.content} />}
            </div>
            <div className="mb-4">
                <label htmlFor="excerpt" className="block mb-2">Excerpt</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="excerpt" name="excerpt" value={postData.excerpt} onChange={handleChange} />
                {errors.excerpt && <ErrorMessage type="error" message={errors.excerpt} />}
            </div>
            <div className="mb-4">
                <label htmlFor="tags" className="block mb-2">Tags</label>
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
                <label htmlFor="category_id" className="block mb-2">Category</label>
                <select 
                    className="border border-gray-300 rounded-md p-2 w-full"
                    id="category_id" 
                    name="category_id" 
                    value={postData.category_id}
                    onChange={handleCategorySelectChange}
                >
                    {categories?.map((category) => (
                        <option className="border border-gray-300 rounded-md p-2 w-full" key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
                </select>
                {errors.category_id && <ErrorMessage type="error" message={errors.category_id} />}
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block mb-2">Status</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="status" name="status" value={postData.status} onChange={handleChange}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                {errors.status && <ErrorMessage type="error" message={errors.status} />}
            </div>
            <div className="mb-4"> 
                <label htmlFor="type" className="block mb-2">Type</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="type" name="type" value={postData.type} onChange={handleChange}>
                    <option value="post">Post</option>
                    <option value="page">Page</option>
                </select>
                {errors.type && <ErrorMessage type="error" message={errors.type} />}
            </div>
            <div className="mb-4">
                <label htmlFor="stock" className="block mb-2">Stock</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="number" id="stock" name="stock" value={postData.stock} onChange={handleChange} />
                {errors.stock && <ErrorMessage type="error" message={errors.stock} />}
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="number" id="price" name="price" value={postData.price ?? 0} onChange={handleChange} />
                {errors.price && <ErrorMessage type="error" message={errors.price} />}
            </div>
            <div className="mb-4">  
                <label htmlFor="locale" className="block mb-2">Locale</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="locale" name="locale" value={postData.locale} onChange={handleChange} />
                {errors.locale && <ErrorMessage type="error" message={errors.locale} />}
            </div>
            <div className="mb-4">
                <label htmlFor="comment_status" className="block mb-2">Comment Status</label>
                <select className="border border-gray-300 rounded-md p-2 w-full" id="comment_status" name="comment_status" value={postData.comment_status} onChange={handleChange}>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
                {errors.comment_status && <ErrorMessage type="error" message={errors.comment_status} />}
            </div>

            {/* params, обьект с произвольными параметрами, создаем поле, указваем ключ и значение, полей может быть много, поэтому создаем поле для каждого поля */}
            {Object.entries(paramsData).map(([key, value]) => (
                <div className="mb-4" key={key}>
                    <label htmlFor={key} className="block mb-2">{key}</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id={key} name={key} value={value} onChange={handleParamsChange} />
                    {errors.params && <ErrorMessage type="error" message={errors.params} />}
                </div>
            ))}

            <button className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer" type="submit">Изменить</button>
        </form>
    );
};

export default EditPostForm;