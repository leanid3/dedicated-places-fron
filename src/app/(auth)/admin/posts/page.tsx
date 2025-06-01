"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { deletePost, getPostsPaginationAdmin } from "@/lib/posts";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/types/types";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const PostsTableContent  = () => {
  const toast = useRef<Toast>(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const page = useSearchParams();
  const pageNumber = page.get("page");
  const limit = page.get("limit");
  const renderParams = (post: Post) => {
    if (!post.params) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(post.params).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </div>
    );
  };

  const renderTags = (post: Post) => {
    if (!post.tags) return null;

    return (
      <div className="flex flex-wrap gap-2 text-sm text-gray-500 font-light">
        {post.tags.map((tag) => {
          if (typeof tag === 'number') return null;
          return <div key={tag.tag_id}>{tag.name}</div>;
        })}
      </div>
    );
  };

  const handleDeletePost = async (post_id: number) => {
    try {
      // Показываем диалог подтверждения
      confirmDialog({
        message: "Вы уверены, что хотите удалить этот пост?",
        header: "Подтверждение удаления",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          // Отправляем запрос на удаление
          await deletePost(post_id); // Ваша функция API

          // Обновляем список постов
          setPosts(posts.filter((post: Post) => post.post_id !== post_id));

          // Показываем уведомление об успехе
          toast.current?.show({
            severity: "success",
            summary: "Успешно",
            detail: "Пост удален",
            life: 3000,
          });
        },
        reject: () => {
          toast.current?.show({
            severity: "info",
            summary: "Отменено",
            detail: "Удаление отменено",
            life: 3000,
          });
        },
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось удалить пост",
        life: 3000,
      });
      console.error("Ошибка при удалении поста:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsPaginationAdmin(Number(pageNumber), Number(limit));
        setPosts(posts);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
      }
    };
    fetchPosts();
  }, [pageNumber, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Toast ref={toast} className="absolute top-0 right-0 z-50" />
      <ConfirmDialog 
        className="p-4"
        acceptClassName="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        rejectClassName="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        acceptLabel="Удалить"
        rejectLabel="Отмена"
        icon="pi pi-exclamation-triangle text-yellow-500"
        acceptIcon="pi pi-trash"
        rejectIcon="pi pi-times"
      />
      <DataTable
        value={posts}
        sortField="title"
        sortOrder={1}
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="actions"
          header="Actions"
          sortable={false}
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                label="Edit"
                icon="pi pi-pencil"
                className="text-sm rounded-full bg-blue-500 text-white p-2"
                onClick={() =>
                  router.push(`/admin/posts/edit/${rowData.post_id}`)
                }
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                className="text-sm rounded-full bg-red-500 text-white p-2"
                onClick={() => handleDeletePost(rowData.post_id)}
              />
            </div>
          )}
        />
        <Column
          field="post_id"
          header="ID"
          sortable
          className="text-sm text-gray-500 font-light w-12 pl-2"
        />
        <Column
          field="category_id"
          header="category_id"
          sortable
          className="text-sm text-gray-500 font-light w-12 pl-2"
        />
        <Column
          field="title"
          header="Title"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="excerpt"
          header="Excerpt"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="slug"
          header="Slug"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="user_id"
          header="User_ID"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="status"
          header="Status"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="type"
          header="Type"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="stock"
          header="Stock"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="price"
          header="Price"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="SEO_title"
          header="SEO Title"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="SEO_description"
          header="SEO Description"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="SEO_keywords"
          header="SEO Keywords"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="locale"
          header="Locale"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="tags"
          header="Tags"
          body={renderTags}
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="params"
          header="Params"
          body={renderParams}
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="comment_count"
          header="Comment Count"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="comment_status"
          header="Comment Status"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="created_at"
          header="Created At"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
        <Column
          field="updated_at"
          header="Updated At"
          sortable
          className="text-sm text-gray-500 font-light pl-2"
        />
      </DataTable>
      <Paginator
        first={1}
        rows={10}
        className="mt-4 flex justify-end items-center space-x-2 bg-white p-4 shadow-md rounded-lg"
        totalRecords={100}
        onPageChange={(e) => {
          console.log(e);
          router.push(`/admin/posts?page=${e.page}&limit=${e.rows}`);
        }}
      />
    </div>
  );
};

const AdminPostsPage = () => {
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostsTableContent />
    </Suspense>
  );
};


export default AdminPostsPage;
