import { LiaSpinnerSolid } from "react-icons/lia";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      Loading...
      <LiaSpinnerSolid
        size={25}
        color="#068645S"
        className="spinner animate-spin"
      />
    </div>
  );
}
