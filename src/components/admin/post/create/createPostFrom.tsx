'use client'
import { getTags } from "@/lib/tags";
import { getCategories } from "@/lib/categories";
import { Post, Tag, Category } from "@/types/types";
import { useEffect, useState } from "react";
import { createPost } from "@/lib/posts";

const CreatePostForm = () => {
    const [tags, setTags] = useState<Tag[] | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [postData, setPostData] = useState<Post>({
        post_id: 0,
        title: "",
        content: "",
        excerpt: "",
        slug: "",
        user_id: 0,
        status: 'archived',
        type: "",
        stock: 0,
        price: 0,
        MultiFields: null,
        params: {},
        SEO_title: "",
        SEO_description: "",
        SEO_keywords: "",
        locale: "",
        tags: [],
        category_id: 0,
        comment_count: 0,
        comment_status: 'open',
        comments: [],
        created_at: new Date(),
        updated_at: new Date(),
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (!tags) return; 
        const selectedTags = tags.filter(tag => selectedTagIds.includes(tag.tag_id));
        setPostData(prev => ({
            ...prev,
            tags: selectedTags
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
        console.log(postData);
        const response = await createPost(postData);
        console.log(response);
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md border border-gray-300">
            <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Title</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="title" name="title" value={postData.title} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block mb-2">Content</label>
                <textarea className="border border-gray-300 rounded-md p-2 w-full" id="content" name="content" value={postData.content} onChange={handleTextareaChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="excerpt" className="block mb-2">Excerpt</label>
                <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="excerpt" name="excerpt" value={postData.excerpt} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="tags" className="block mb-2">Tags</label>
                <select 
                    className="border border-gray-300 rounded-md p-2 w-full"
                    id="tags" 
                    multiple 
                    name="tags" 
                    value={postData.tags?.map(tag => tag.tag_id.toString())}
                    onChange={handleTagSelectChange}
                >
                    {tags?.map((tag) => (
                        <option className="border border-gray-300 rounded-md p-2 w-full" key={tag.tag_id} value={tag.tag_id}>{tag.name}</option>
                    ))}
                </select>
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
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-md w-full" type="submit">Create</button>
        </form>
    );
};

export default CreatePostForm;