"use client";
import "./PostSearch.scss";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { getPostsBySearch } from "../../services/getPosts";
import { usePosts } from "@/store";
import useSWR from "swr";

// type Props = {
//   onSearch: (search: any[]) => void;
// };

// при пошуку з кастомним хуком (usePosts) вставити у пропси = { onSearch }: Props
const PostSearch = () => {
  // для пошуку за допомоги SWR:
  const { mutate } = useSWR("posts");

  const [search, setSearch] = useState(""); // створюємо стейт для пошуку постів по назві статті (search)

  // для пошуку по хуку (usePosts) використовуємо цей рядок:
  // const getPostsBySearch = usePosts((state) => state.getPostsBySearch);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle search logic here

    // const posts =  - якщо пошук по хуку (usePosts) то видалити цей рядок
    // якщо пошук за допомогою SWR то залишати:
    const posts = await getPostsBySearch(search); // викликаємо функцію, яка буде виконуватися при пошуку - пошук постів по назві статті

    // onSearch(posts); // встановлюємо пости
    mutate(posts);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event)
        }
        className="search__input"
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
};

export default PostSearch;
