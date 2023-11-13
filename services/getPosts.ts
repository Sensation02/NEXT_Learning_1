// Для того щоб нам підтягнути наші статті треба використати асинхронну функію
export async function getPosts() {
  // робимо все асинхронно
  const response = await fetch("/api/posts", {
    next: {
      revalidate: 60, // тут ми вказуємо що дані будуть оновлюватися кожні 60 секунд
    },
  }); // фетчимо наші дані з сервера, але цей фетч трошки відрізняється від того, який ми використовували раніше. Він розширений більшим функціоналом який нам приносить саме Некст.
  if (!response.ok) throw new Error("Unable to fetch posts"); // якщо відповідь не ок, то викидаємо помилку
  const posts = await response.json(); // отримуємо відповідь в форматі json
  return posts; // повертаємо наші пости

  // так як наша функція "на сервері" то тут ми можемо працювати і з БД, також тут можуть бути якісь секретні ключі які налаштовуються в .env.
}
export const getPostsBySearch = async (search: string) => {
  const response = await fetch(`/api/posts?title=${search}`);

  if (!response.ok) throw new Error("Unable to fetch posts.");

  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch("/api/posts");

  if (!response.ok) throw new Error("Unable to fetch posts.");

  return response.json();
};
