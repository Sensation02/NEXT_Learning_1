import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";

import "./style.scss";

export default async function Profile() {
  const session = await getServerSession(authConfig); // отримуємо сесію з сервера

  // якщо в нас є сесія то ми виводимо інформацію про користувача з сесії
  return (
    <div className="profile">
      <h1 className="profile__name">Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <img src={session.user.image} alt="user_image" />
      )}
    </div>
  );
}
