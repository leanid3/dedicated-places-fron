"use client"
import PostCard from "./PostCard"
import { Post } from "@/types/types"

interface PostsProps{
    posts: Post[]
}
const PostList = ({posts}: PostsProps) =>{
    return(
        <div className="grid  xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 py-10">
            {posts.map((post) =><PostCard key={post.post_id} post={post} />)}
        </div>
    )
}

export default PostList