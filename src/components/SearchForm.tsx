"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./search.module.css";
import { getTags } from "@/lib/tags";

interface Tag {
  tag_id: number;
  name: string;
  slug: string;
}

interface SearchFormInput {
  query: string;
  tags: number[]; // Добавляем поле для хранения выбранных тегов
}

export default function SearchForm() {
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormInput>();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
      setValue("tags", newTags);
      return newTags;
    });
  };

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    const params = new URLSearchParams();

    if (data.query) params.append("query", data.query);
    if (data.tags && data.tags.length > 0) {
      data.tags?.forEach((tag) => params.append("tags[]", tag.toString()));
    }
    const queryString = decodeURIComponent(params.toString());
    router.push(`/search?${queryString}`);
  };

  if (loadingTags) {
    return <div>Загрузка тегов</div>;
  }

  return (
    <form className={style.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.divSearch}>
        <input
          {...register("query", { required: true })}
          placeholder="Город"
          defaultValue={""}
          type="text"
          className={style.inpSearch1}
        />
        <input
          {...register("query", { required: true })}
          placeholder="Поиск"
          defaultValue={""}
          type="text"
          className={style.inpSearch2}
        />
        <button type="submit" className={style.button}></button>
      </div>
      <div className={style.tags}>
        {tags.map((tag) => (
          <button
            type="button"
            className={`${style.tag} ${
              selectedTags.includes(tag.tag_id) ? style.selected : ""
            }`}
            key={tag.tag_id}
            onClick={() => toggleTag(tag.tag_id)}
          >
            {tag.name}
          </button>
        ))}
      </div>

      <input type="hidden" {...register("tags")} />

      <div className="flex h-12 mt-2">
        {errors.query && (
          <span className="w-full text-center py-2 border-4 border-red-700 rounded-2xl bg-red-300 text-red-700 font-bold">
            Поле обязательно для заполнения
          </span>
        )}
      </div>
    </form>
  );
}
