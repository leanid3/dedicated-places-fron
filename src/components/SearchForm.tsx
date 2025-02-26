"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <input
          {...register("query", { required: true })}
          placeholder="Введите текст..."
          defaultValue={""}
          type="text"
          className=" basis-3/4 border-2 border-black py-2 px-2 rounded-4xl focus:outline-amber-500  focus:outline-2 focus:outline-offset-2 focus:border-white focus:shadow-xl"
        />
        <button
          type="submit"
          className="basis-1/4 px-2 py-1 ms-2 rounded-3xl bg-amber-500 hover:bg-amber-600 focus:outline-2 focus:outline-offset-2 font-bold text-gray-100 focus:text-gray-300 focus:outline-amber-500 focus:shadow-xl active:bg-amber-700"
        >
          Поиск
        </button>
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
