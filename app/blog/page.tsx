"use client";
import { Metadata } from "next";
import { Posts } from "@/components/Posts/Posts";
import "./style.css";
import React, { useEffect, useState } from "react";
import { getPosts } from "@/services/getPosts";
import PostSearch from "@/components/PostSearch/PostSearch";
import { usePosts } from "@/store";
import { getAllPosts } from "../../services/getPosts";
import { shallow } from "zustand/shallow";
import { get } from "http";

export const metadata: Metadata = {
  title: "Blog | NEXT Learning",
  description: "Blog page",
};

// Далі ми бачимо компонент, він також відрізняється від того що є у звичайному Реакті. Він може бути асинхронним так як всі компоненти в Некст - серверні. Окрім цього є ще клієнтські компоненти. Різниця між ними в тому що, на серверних не можна користуватися Хуками, а на клієнтських можна. Для того щоб користуватися ними в кожному файлі сторінки треба вказувати 'use client'.

// 1: пошук по хуках (має бути use client)
// export default function Blog() {
//   const [posts, setPosts] = useState<any[]>([]); // створюємо стейт для наших постів
//   const [loading, setLoading] = useState(true); // створюємо стейт для пошуку

//   useEffect(() => {
//     // створюємо функцію, яка буде виконуватися при завантаженні сторінки
//     getPosts()
//       .then(setPosts) // встановлюємо пости
//       .finally(() => setLoading(false)); // викликаємо функцію, яка буде виконуватися при завантаженні сторінки. Тобто коли пости завантажилися, то відбувається встановлення стейта loading в false і відбувається завершення завантаження сторінки
//   }, []);

//   return (
//     <>
//       <h1>Blog page</h1>
//       <PostSearch onSearch={setPosts} />
//       {loading ? <p className="loading"></p> : <Posts posts={posts} />}
//     </>
//   );
// }

// 2: пошук за допомогою Zustand (як альтернатива Redux - тобто свій хук)
// для роботи з ним було створено папку store, в якій є файл index.ts
// export default function Blog() {
//   const [posts, loading, getAllPosts] = usePosts(
//     (state) => [state.posts, state.loading, state.getAllPosts],
//     shallow
//   ); // створюємо стейт для наших постів
//   // shallow - це функція яка нам говорить що сторінка не має перезавантажуватися при зміні стейта
//   useEffect(() => {
//     getAllPosts();
//   }, [getAllPosts]);

//   return (
//     <>
//       <h1>Blog page</h1>
//       <PostSearch />
//       {loading ? <p className="loading"></p> : <Posts posts={posts} />}
//     </>
//   );
// }

// 3: пошук за допомогою SWR (щось схоже на react query)
export default function Blog() {
  // основна дія відбувається в компоненті PostS
  return (
    <>
      <h1>Blog page</h1>
      <PostSearch />
      <Posts />
    </>
  );
}
