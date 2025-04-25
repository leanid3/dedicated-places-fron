"use client";
import PostList from "@/components/posts/PostList";
import { searchPosts } from "@/lib/posts";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Post } from "@/types/types";
import React, { Suspense } from "react";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () => searchPosts(query || ""),
    enabled: !!query,
  });

  if (isLoading) {
    return <div>Загрузка</div>;
  }
  if (isError) {
    return <div>Посты не найдены</div>;
  }
  return (
    <div>
      {posts && posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p>Посты не найдены</p>
      )}
    </div>
  );
};

const SearchResultWrapper = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SearchResult />
    </Suspense>
  );
};

export default SearchResultWrapper;
