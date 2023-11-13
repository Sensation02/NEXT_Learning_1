"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import { GoogleButton } from "../GoogleButton/GoogleButton";
import "./style.scss";

const SignInForm = () => {
  // використовуємо useRouter для переходу на іншу сторінку
  const router = useRouter();

  // відправляємо дані форми на сервер
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    // витягуємо дані з форми
    const formData = new FormData(event.currentTarget);
    // тобто нам не потрібно все прописувати в інпутах для отримання даних з форми. Все це робить FormData який є складовою частиною браузера і ми можемо його використовувати (web api)

    // відправляємо дані на сервер
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    // перевіряємо чи є помилки
    if (res && !res.error) {
      // переходимо на сторінку профілю якщо все добре
      router.push("/profile");
    } else {
      console.log(res);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email" className="login-form__title">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Enter your email"
        className="login-form__input"
      />
      <label htmlFor="password" className="login-form__title">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        className="login-form__input"
        required
      />
      <button type="submit" className="login-form__button">
        Sign In
      </button>
      <GoogleButton />
    </form>
  );
};

export { SignInForm };
