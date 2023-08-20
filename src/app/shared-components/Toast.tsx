import toast from "react-hot-toast";
import Image from "next/image";
import CheckCircle from "../../../public/svg/check-circle.svg";
import XMark from "../../../public/svg/x-mark.svg";
import { FaExclamation } from "react-icons/fa";

import { Status } from "@/hooks/useToast";

const Toast = ({ t, title, body, type }: ToastProps) => {
  const getColor = () => {
    switch (type) {
      case "error":
        return "bg-red-100 border-red-50";
      default:
        return "bg-[#D1FADF] border-[#ECFDF3]";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <FaExclamation className="red" style={{ fill: "rgb(239, 68, 68)" }} />;

      default:
        return <Image src={CheckCircle} alt="check-circle" width={20} />;
    }
  };

  return (
    <div
      className={`${
        t.visible
          ? "animate-in fade-in zoom-in"
          : "animate-out fade-out zoom-out"
      } flex max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto p-4`}
    >
      <div
        className={`${getColor()} self-start rounded-full border-[6px] p-[10px] mr-[14px]`}
      >
        {getIcon()}
      </div>

      <div className="self-center flex-grow pr-4">
        <p className="text-[#101828] text-sm">{title}</p>
        {body && <p className="text-[#667085] text-sm font-[300]">{body}</p>}
      </div>

      <div onClick={() => toast.dismiss(t.id)}>
        <Image src={XMark} alt="x-mark" />
      </div>
    </div>
  );
};

export default Toast;

interface ToastProps extends Status {
  t: any;
}
