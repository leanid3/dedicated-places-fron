"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect, useRef } from "react"; // Импортируем useRef
import { SubmitHandler, useForm } from "react-hook-form";
import style from "./search.module.css";
import { getTags } from "../lib/tags";

interface SearchFormInput {
  query: string;
}

export default function SearchForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInput>();

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    console.log(data);

    router.push(`/search?query=${encodeURIComponent(data.query)}`);
  };

  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getTags();
      if (result instanceof Error) {
        setError(result.message);
      } else {
        setTags(result);
      }
    };

    fetchTags();
  }, []);

  const lastTagYellow = useRef(false);

  if (error) return <div>{error}</div>;

  return (
    <form className={style.searchForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.search}>
        <input
          {...register("query", { required: true })}
          placeholder="Поиск..."
          defaultValue={""}
          type="text"
          className=""
        />
        <button type="submit" className={style.button}></button>
      </div>
      <div className={style.tags}>
        {tags.map((tag) => {
          let isRandom = Math.random() < 0.5;
          if (lastTagYellow.current && isRandom) {
            isRandom = false;
          }
          lastTagYellow.current = isRandom;

          return (
            <button
              className={`${style.tag} ${isRandom ? style.yellow : ""}`}
              key={tag.tag_id}
              disabled
            >
              {tag.name}
            </button>
          );
        })}
      </div>
      <div className="flex h-12 mt-2">
        {errors.query && (
          <span className=" w-full text-center py-2 border-4 border-red-700 rounded-2xl bg-red-300 text-red-700 font-bold">
            Поле обязательно для заполенения
          </span>
        )}
      </div>
    </form>
  );
}
