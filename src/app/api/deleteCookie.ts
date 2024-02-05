"use server";
import { cookies } from "next/headers";

export default async function deleteCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return;
}
