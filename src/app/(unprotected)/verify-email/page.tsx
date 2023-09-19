import { userTag } from "@/tags";
import makeRequest from "@/utils/makeRequest";
import { redirect } from "next/navigation";
import { revalidate } from "@/app/api/revalidate";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { token } = searchParams;
  if (token) {
    const endpoint = `/api/v1/users/verify-email`;

    const headers = { "X-Auth-Token": token, cache: "no-cache" };
    await makeRequest(endpoint, { headers });
    revalidate(userTag); // revalidate after user isEmailVerified property changes
    redirect("/login");
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>No token supplied</div>
      </div>
    );
  }
}