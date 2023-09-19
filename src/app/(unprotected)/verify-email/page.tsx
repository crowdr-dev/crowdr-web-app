import { userTag } from "@/tags";
import makeRequest from "@/utils/makeRequest";
import { redirect } from "next/navigation";
import { revalidate } from "@/app/api/revalidate";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { token } = searchParams;

  if (token) {
    const endpoint = `/api/v1/users/verify-email`;
    const headers = { "X-Auth-Token": token, cache: "no-cache" };

    try {
      await makeRequest(endpoint, { headers });
      revalidate(userTag); // revalidate after user isEmailVerified property changes
      redirect("/login");
    } catch (error) {
      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <div>{extractErrorMessage(error)}</div>
        </div>
      );
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>No token supplied</div>
      </div>
    );
  }
}
