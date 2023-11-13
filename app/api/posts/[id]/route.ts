import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { posts } from "../posts";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } } // тут ми вказуємо що наші параметри будуть містити id
) {
  const id = params.id; // тут ми витягуємо id з параметрів

  const headerList = headers(); // тут ми витягуємо заголовки (read-only)
  const type = headerList.get("content-type"); // тут ми витягуємо заголовок content-type
  const cookieList = cookies(); // тут ми витягуємо куки (read-only)
  const oneCookie = cookieList.get("one"); // тут ми витягуємо куку "one"

  // логіка видалення поста

  return NextResponse.json({
    message: `Post ${id} deleted`,
    type,
    cookieList,
    oneCookie,
  });
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const post = posts.find((post: any) => post.id === Number(id));

  return NextResponse.json({
    message: `Post ${id} fetched`,
  });
}
