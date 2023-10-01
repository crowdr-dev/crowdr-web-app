import Link from "next/link";
import Test from "../../components/Test";
import { getUser } from "@/app/api/user/getUser";

export default async function Dashboard() {
  const user = await getUser();
  return (
    <div>
      Welcome to the Dashboard <Link href={"/explore"}>werey</Link>{" "}
      <Test />
    </div>
  );
}