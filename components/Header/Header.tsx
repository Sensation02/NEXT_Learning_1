import "./Header.css";
import Navigation from "../Navigation/Nav";

// створили наш масив з вкладками, які будуть відображатися в хедері. Його можна легко редагувати додавши або видаливши вкладку
const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const Header = () => {
  return (
    <header className="header">
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;
