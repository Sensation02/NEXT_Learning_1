"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import "./style.scss";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="google-button"
    >
      Sign in with Google
    </button>
  );
};

export { GoogleButton };
