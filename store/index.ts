import { create } from "zustand";
import { getAllPosts } from "@/services/getPosts";
import { getPostsBySearch } from "../services/getPosts";

// Створюємо наш хук з Zustand
// Спершу робимо тип для нашого хука
type UsePosts = {
  posts: any[]; // тут ми вказуємо що наші пости будуть масивом об'єктів з будь-якими значеннями
  loading: boolean; // тут ми вказуємо що наша завантаження буде булевим значенням
  getAllPosts: () => Promise<void>; // тут ми вказуємо що наша функція буде асинхронною і не буде нічого повертати
  getPostsBySearch: (search: string) => Promise<void>; // тут ми вказуємо що наша функція буде асинхронною, приймає строку і не буде нічого повертати
};

// Тепер створюємо наш хук
export const usePosts = create<UsePosts>((set) => ({
  posts: [], // тут ми вказуємо що наші пости будуть пустим масивом для початку
  loading: false, // тут ми вказуємо що наша завантаження буде false

  // Далі методи які ми будемо використовувати в нашому компоненті
  getAllPosts: async () => {
    set({ loading: true }); // вказуємо що йде завантаження
    const posts = await getAllPosts(); // отримуємо наші пости
    set({ posts, loading: false }); // виводимо пости, вказуємо що завантаження закінчилось
  },

  getPostsBySearch: async (search: string) => {
    set({ loading: true }); // вказуємо що йде завантаження
    const posts = await getPostsBySearch(search); // отримуємо наш пост з інпута пошуку
    set({ posts, loading: false }); // виводимо пост що шукали, вказуємо що завантаження закінчилось
  },
}));

// Тепер використовуємо наш хук в компоненті
// Видаляємо лишні хуки стейтів, ефекту залишаємо
// Використовуємо наш хук

// const [posts, loading, getAllPosts] = usePosts(state => [state.posts, state.loading, state.getAllPosts, state.getPostsBySearch], shallow);

// shallow - це оптимізація, яка дозволяє нам не рендерити компоненти які не змінилися
