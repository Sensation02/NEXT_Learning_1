"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import "./Nav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Створюємо наш тип NavLink для того щоб вказати типи для нашого масиву
type NavLink = {
  label: string; // назва вкладки
  href: string; // шлях до вкладки
};

// Тип для того щоб вказати який тип пропсів має приймати компонент
type Props = {
  navLinks: NavLink[];
};

// Створюємо компонент Navigation в якому пропсами будуть типу Props і які приймають масив NavLink (він же navItems в Header.tsx)
const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname(); // використовуємо хук usePathname для того щоб отримати поточний шлях

  const session = useSession(); // використовуємо хук useSession для того щоб отримати поточну сесію, але він потребує провайдера SessionProvider

  console.log(session);

  return (
    <nav className="nav">
      {navLinks.map((link) => {
        const isActive = pathname === link.href; // перевіряємо чи поточний шлях співпадає з шляхом вкладки

        return (
          <Link
            href={link.href}
            key={link.label}
            // якщо поточний шлях співпадає з шляхом вкладки то додаємо клас active який міняє нам стилізацію вкладки
            className={isActive ? "nav-link active" : "nav-link"}
          >
            {link.label}
          </Link>
        );
      })}
      {session.data?.user?.name && (
        <Link href="/profile" className="nav-link">
          Profile
        </Link>
      )}
      {!session?.data ? (
        <Link href="/signin" className="nav-link">
          SignIn
        </Link>
      ) : (
        <Link
          href="#"
          className="nav-link"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          SignOut
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
