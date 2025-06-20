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
    const endpoint = `/users/verify-email`;
    const headers = { "X-Auth-Token": token };


    try {
      await makeRequest(endpoint, { headers, cache: "no-cache" });
    
      revalidate(userTag); // revalidate after user isEmailVerified property changes
    } catch (error) {
      console.log(extractErrorMessage(error),999)
      return (
        <div className="flex items-center justify-center h-screen w-screen">
          <div>{extractErrorMessage(error)}</div>
        </div>
      );
    }

    // redirect if there is no error
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
