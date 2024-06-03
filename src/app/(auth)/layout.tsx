import { PropsWithChildren } from "react";
import { getUser } from "../api/user/getUser";
import { handleUserRedirection } from "@/utils/handleUserRedirection";

export default async function Layout({ children }: PropsWithChildren) { 
  const  user = await getUser();

  handleUserRedirection(user);
  return <section className="font-satoshi">{children}</section>;
}
