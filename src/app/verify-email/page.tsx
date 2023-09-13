import makeRequest from "@/utils/makeRequest";
import { redirect } from "next/navigation";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { token } = searchParams;
  if (token) {
    const endpoint = `/api/v1/users/verify-email`;

    const headers = { "X-Auth-Token": token };
    await makeRequest(endpoint, { headers });

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