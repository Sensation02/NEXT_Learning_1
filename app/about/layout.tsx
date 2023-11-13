import Link from "next/link";
import "./style.css";

// для вкладеності мо створюємо леяут. В ньому ми вже будемо вказувати ті сторінки які будуть вкладені в цю сторінку. Тут у нас це сторінки Contacts та Team

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page-content">
      <h1 className="title title__small">About me</h1>
      {children}
      {/* children це конкретно ця сторінка (page.tsx). Її ми можемо ставити будь де, де нам потрібно */}
      <ul className="list">
        <li className="list--item">
          <Link href="/about/contacts">Contacts</Link>
          {/* тут шлях завжди пишеться повністю */}
        </li>
        <li className="list--item">
          <Link href="/about/team">Team</Link>
        </li>
      </ul>
    </div>
  );
}
