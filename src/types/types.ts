// Тип для категории
interface Category {
    category_id: number;
    name: string;
    description: string;
    SEO_title: string;
    SEO_description: string;
    SEO_Keywords: string;
}

// Тип для тега
interface Tag {
    tag_id: number;
    name: string;
    slug: string;
}

interface User {

}

interface Comment {
    parent_id: number,
    title: string,
    comment: string,
    status: string,
    post_id: number,
    author: User | any
}

interface MultiField {
    path: string,
    post_id: number
}

// Тип для основного ответа
interface Post {
    post_id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    user_id: number;
    status: 'archived' | 'published' | 'draft';
    type: string;
    stock: number;
    price: number | null;
    MultiFields: MultiField | null; // Уточните тип, если знаете структуру
    params: string[];
    SEO_title: string;
    SEO_description: string;
    SEO_keywords: string;
    locale: string;
    tags: Tag[] | null;
    comment_count: number;
    comment_status: 'open' | 'closed';
    comments: Comment[] | null; // Уточните тип, если знаете структуру
    created_at: Date;
    updated_at: Date;
}