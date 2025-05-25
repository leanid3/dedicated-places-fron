// app/places/page.tsx
import PostFilter from "@/components/posts/PostFilter";
import PostList from "@/components/posts/PostList";
import { getPostsPaginationUser } from "@/lib/posts";
import { FilterPosts } from "@/lib/filterPosts";

export default async function PlacesPage() {
  const posts = await getPostsPaginationUser(1, 10);
  const filterPosts = new FilterPosts(posts);
  const filterOptions = filterPosts.getFilterOptions();

  return (
    <div className="places-page">
      <aside className="filters">
        <PostFilter 
          filterOptions={filterOptions} 
          onFilterChange={(filters) => {
            console.log('Selected filters:', filters);
          }}
        />
      </aside>
      <main className="posts">  
        <PostList posts={posts} />
      </main>
    </div>
  );
}