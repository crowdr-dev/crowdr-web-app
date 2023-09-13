import { getUser } from "@/app/api/user/getUser";
import Link from "next/link";

export default async function Explore() {
  const user = await getUser();
  return <div>Welcome to the Explore Page! <Link href={"/dashboard"}>dashboard</Link>{" "}</div>;
}
