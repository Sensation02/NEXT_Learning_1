import { NextResponse } from "next/server";
import { posts } from "./posts";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");

  let currentPosts = posts;

  if (title) {
    currentPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  // це все пошук поста по заголовку який ми задаємо в строці браузера
  // http://localhost:3000/api/posts?title=Napoli
  // і в результаті ми отримаємо тільки пост з заголовком який містить Napoli

  // return NextResponse.json({ message: "Hello World!" });
  return NextResponse.json(currentPosts);
}

// такі роути тестувати записуючи в строку браузера те, який шлях у нас тут в папках - це і буде шлях до роута - тобто в нашому випадку це буде http://localhost:3000/api/posts
// в якості відповіді ми отримаємо { message: "Hello World!" } або те що ми вкажемо в якості відповіді

export async function POST(req: Request, res: Response) {
  const { title, body } = await req.json();
  posts.push({ id: posts.length + 1, title, body });
  return NextResponse.json(posts); // тут ми відповідаємо тим же масивом, але вже з новими даними
}

// все виглядає ніби просто?
