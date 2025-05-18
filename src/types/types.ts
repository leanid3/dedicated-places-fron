// Interface for category
export interface Category {
    category_id: number;
    name: string;
    description: string;
    SEO_title: string;
    SEO_description: string;
    SEO_Keywords: string;
    posts: Post[]
}

// Interface for tag
export interface Tag {
    tag_id: number;
    name: string;
    slug: string;
}

export interface User {
  id: number;
  name: string;
  fio: string;
  role: 'admin' | 'user' | 'companion';
  email: string;
  phone?: string;
  age?: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
    comment_id: number,
    parent_id: number,
    title: string,
    comment: string,
    status: string,
    post_id: number,
    author: User | string
}

export interface MultiField {
    path: string,
    post_id: number
}

// Interface for main response
export interface Post {
    post_id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    user_id: number;
    status: string;
    type: string;
    stock: number;
    price: number | null;
    MultiFields: MultiField | null;
    params: Record<string, string>;
    SEO_title: string;
    SEO_description: string;
    SEO_keywords: string;
    locale: string;
    tags: Tag[] | null;
    category_id: number;
    comment_count: number;
    comment_status: string;
    comments: Comment[] | null;
    created_at: Date;
    updated_at: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string | null;
  fio: string;
  age: number;
}