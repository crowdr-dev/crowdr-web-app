import { LiaSpinnerSolid } from "react-icons/lia";
import Image from "next/image";

type Props = {
  size?: "full" | "contain";
}
export default function Loading(props: Props) {
  const { size = "full" } = props;
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={`flex items-center justify-center ${size === "full" ? "h-screen w-screen absolute" : "h-full w-full"} m-auto `}>
      <Image src="/images/loader.gif" alt="loading" width={150} height={150} />
    </div>
  );
}
