import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/data/users";

// конфіг з одним провайдером на основі Google
export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // Credentials - це провайдер, який дозволяє нам використовувати власну форму входу. В ній ми вказуємо поля, які будуть в формі, і функцію authorize, яка викликається при натисканні на кнопку входу. В authorize ми виконуємо запит на наш сервер, де ми перевіряємо введені дані і повертаємо користувача, якщо він існує. Якщо користувача не існує, повертаємо null. Якщо ми повертаємо користувача, то він автоматично зберігається в сесії і ми можемо отримати доступ до нього в будь-якому місці нашого додатку.
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        // якщо не вказані дані для входу, то повертаємо null
        if (!credentials?.email || !credentials?.password) return null;

        // тут може бути історія із взаємодією з сервером

        // якщо вказані дані для входу, то перевіряємо їх
        const currentUser = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        // якщо користувача знайдено і пароль співпадає, то повертаємо його
        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...user } = currentUser;
          return user as User;
        }

        // !!! всі паролі повинні бути захешовані !!!

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};
