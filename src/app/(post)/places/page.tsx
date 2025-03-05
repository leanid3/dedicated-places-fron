"use client"
import PostList from "@/components/posts/PostList";
import { getPosts } from "@/lib/posts";
import { useQuery } from "@tanstack/react-query";

interface PostsParams {
  category_id: number;
}

const PostsPage = ({ category_id }: PostsParams) => {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts", category_id],
    queryFn: () => getPosts(category_id),
    enabled: !!category_id,
  });

  if (isLoading) {
   return <div>
        загрузка постов
    </div>
  }
  if (isError) {
    return <div>
        Посты не найдены
    </div>
  }

  return (
    <div>{posts && posts.length > 0 ?(
        <PostList posts={posts} />
    ):<p>Посты не найдены</p>}
    </div>
  );
}

export default PostsPage