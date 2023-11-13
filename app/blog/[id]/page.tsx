import { Metadata } from "next";

// Для того щоб нам підтягнути наші статті треба використати асинхронну функію
async function getPosts(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return response.json();
}

type Props = {
  params: {
    id: string; // тут id це назва динамічної папки, якби папка називалася по іншому то тут була б інша назва
  };
};

// тут ми створили динамічну сторінку, яка буде відображатися на сторінці /blog/1, /blog/2, /blog/3 і т.д. Де 1, 2, 3 - це буде id і він буде динамічним
// Перейшовши на http://localhost:3000/blog/1dsa - буде відображатися сторінка Post page 1dsa

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  // відповідно ми тут вказуємо що це повернутися нам має проміс з метаданими і сама функція має бути асинхронною
  const post = await getPosts(id); // тут ми вказуємо що ми викликаємо функцію getPosts і передаємо в неї айді

  return {
    title: `Post - ${post.title} | NEXT Learning`, // тут приходить айді з динамічної папки або можемо вказати тайтл нашого поста
    description: "Post page",
  };
}

// повертаємо нашу верстку в які є заголовок статті, яку ми зафетчили, і тіло статті
export default async function Post({ params: { id } }: Props) {
  const post = await getPosts(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "black" }}>
        {post.body}
      </p>
    </>
  );
}
