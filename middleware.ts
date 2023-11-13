export { default } from "next-auth/middleware";

// створили наш конфіг для приватних роутів. Всі вони записуються в масиві matcher
export const config = { matcher: ["/profile", "/profile/:id"] };
