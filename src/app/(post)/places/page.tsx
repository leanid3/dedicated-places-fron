import {getPosts} from "@/lib/posts";

interface PostsParams {
    params:
        {
            category_id: number
        }
}

export default async function Page({params}: PostsParams) {
    const posts = await getPosts(params.category_id)
    console.log(posts)
    return (
        <p>
            content
        </p>
    )
}