import { PropsWithChildren } from "react";
import { getUser } from "../api/user/getUser";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const confirmationPath = "/confirmation";
const registerOrgPath = "/register-organization";
const explore = "explore";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const headersList = headers();
  const user = (await getUser())!;
  const currentPath = headersList.get("x-pathname");

  switch (true) {
    // currentPath !== confirmationPath prevents infinite redirect if coming from confirmationPath
    // take unverified users to confirmation page
    case currentPath !== confirmationPath && !user.isEmailVerified:
      redirect(confirmationPath);

    // take verified non-profit user without a business to register
    case currentPath !== registerOrgPath &&
      user.isEmailVerified &&
      user.userType === "non-profit" &&
      !user.organizationId:
      redirect(registerOrgPath);

    // prevent non-profit user with an already registerd busines from going to register again
    case currentPath === registerOrgPath &&
      user.userType === "non-profit" &&
      Boolean(user.organizationId):
      redirect(explore);

    // prevent indiviual user tryig to access register-organization from accessing it
    case currentPath === registerOrgPath && user.userType === "individual":
      redirect(explore);

    // finally prevent a user that is done with verirification & escaoed all the business registration check above from going to confirmation again
    case currentPath === confirmationPath && user.isEmailVerified:
      redirect(explore);

    default:
      break;
  }

  return <section>{children}</section>;
}
