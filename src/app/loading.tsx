import { LiaSpinnerSolid } from "react-icons/lia";

type Props = {
  size?: "full" | "contain";
}
export default function Loading(props: Props) {
  const { size = "full" } = props;
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={`flex items-center justify-center ${size === "full" ? "h-screen" : "h-fit"} w-screen`}>
      Loading...
      <LiaSpinnerSolid
        size={25}
        color="#068645S"
        className="spinner animate-spin"
      />
    </div>
  );
}
