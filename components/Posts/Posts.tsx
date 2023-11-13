import Link from "next/link";
import "./posts.scss";
import useSWR from "swr";
import { getAllPosts } from "@/services/getPosts";

// type Props = {
//   posts: any[];
// };

// при пошуку з кастомним хуком (usePosts) вставити у пропси = { posts }: Props
const Posts = () => {
  const { data: posts, isLoading } = useSWR("posts", getAllPosts);

  return isLoading ? (
    <p className="loading"></p>
  ) : (
    <ul className="posts">
      {posts.map((post: any) => (
        <li className="posts__item" key={post.id}>
          <Link href={`/blog/${post.id}`} className="posts__link">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export { Posts };
