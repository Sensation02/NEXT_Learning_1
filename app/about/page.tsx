import "./style.css";

export const metadata = {
  title: "About me | NEXT Learning",
  description: "About page",
}; // так виглядають метадані для нашої сторінки

export default function AboutPage() {
  return (
    <div className="page-header">
      <p className="text">This is the about page</p>
    </div>
  );
}
