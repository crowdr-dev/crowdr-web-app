"use server";
import { cookies } from "next/headers";
import makeRequest from "@/utils/makeRequest";

export type User = {
  _id: string;
  token: string;
  isEmailVerified: boolean;
  userType: "individual" | "non-profit";
  organizationId: string | null;
};

// for getting user in server components, also a server action that can be called from client components
export const getUser = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return null;
  }

  const endpoint = `/api/v1/users/current-user`;
  const headers = {
    "x-auth-token": token,
  };

  const { data: user } = await makeRequest<{ data: User }>(endpoint, {
    headers,
    cache: "force-cache",
  });
  return user;
};
