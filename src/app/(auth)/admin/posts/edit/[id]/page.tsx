"use client";
import EditPostForm from "@/components/admin/post/edit/editPostForm";
import { getPost } from "@/lib/posts";
import { Post } from "@/types/types";
import { use, useEffect, useState } from "react";

const EditPost = ({ params }: { params: Promise<{ id: string }>  }) => {
  //получаем id поста из url, в url: admin/posts/edit/{post_id}
  const resolvedParams = use(params);
  const post_id = resolvedParams.id;
  console.log(post_id);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(Number(post_id));
      setPost(post);
    };
    fetchPost();
  }, [post_id]);
  return <div>{post && <EditPostForm post={post} />}</div>;
};

export default EditPost;
