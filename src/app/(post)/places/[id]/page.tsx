import { getPost } from "@/lib/posts";

interface PostProps {
    params: {
        id: number;
    };
}

// Делаем компонент страницы асинхронным
export default async function Post({ params }: PostProps) {
    // Используем `await` для получения данных
    const post: Post = await getPost(params.id);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}