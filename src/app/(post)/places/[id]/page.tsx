import PostFull from "@/components/posts/PostFull";
import { getPost} from "@/lib/posts";
interface PostProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Post({ params }: PostProps) {
    const resolvedParams = await params;
    const post  = await getPost(Number(resolvedParams.id));

    return (
      <PostFull post={post} />
    );
}