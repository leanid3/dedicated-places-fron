// регистрация
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  age: number;
  phone: string;
  fio: string;
};

// ошибки регистрации
export type ErrorRegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  age: number;
  phone: string;
  fio: string;
};

// авторизация
export type LoginFormData = {
  email: string;
  password: string;
};

// ошибки авторизации
export type ErrorLoginForm = {
  email: string;
  password: string;
};


export type UpdatePostFormData = {
  category_id?: number; // sometimes, integer, exists:categories,category_id
  title: string; // string, max:255
  content?: string; // nullable, string, max:255
  excerpt?: string; // nullable, string, max:255
  slug?: string; // sometimes, string, max:255, unique
  status?: string; // nullable, string
  type?: string; // nullable, string
  params?: Record<string, string>; // nullable, array
  stock?: number; // nullable, integer, min:0
  price?: number; // nullable, integer, min:0
  seo_title?: string; // nullable, string, max:255
  seo_description?: string; // nullable, string, max:255
  seo_keyword?: string; // nullable, string, max:255
  locale?: string; // nullable, string, max:255
  comment_status?: string; // nullable, string
  tags?: number[]; // nullable, array, exists:tags
  photos?: File[]; // nullable, array, image, mimes:jpeg,png,jpg,gif, max:2048
  deleted_photos?: number[]; // sometimes, array, exists:multi_fields,id
}

export type StorePostFormData = {
  category_id?: number; // sometimes, integer, exists:categories,category_id
  title: string; // string, max:255
  content?: string; // nullable, string, max:255
  excerpt?: string; // nullable, string, max:255
  slug?: string; // sometimes, string, max:255, unique
  status?: string; // nullable, string
  type?: string; // nullable, string
  params?: Record<string, string>; // nullable, object with string keys and string values
  stock?: number; // nullable, integer, min:0
  price?: number; // nullable, integer, min:0
  seo_title?: string; // nullable, string, max:255
  seo_description?: string; // nullable, string, max:255
  seo_keyword?: string; // nullable, string, max:255
  locale?: string; // nullable, string, max:255
  comment_status?: string; // nullable, string
  tags?: number[]; // nullable, array, exists:tags
  photos?: File[]; // nullable, array, image, mimes:jpeg,png,jpg,gif, max:2048
  deleted_photos?: number[]; // sometimes, array, exists:multi_fields,id
}
