import toast from "react-hot-toast";
import Image from "next/image";
import CheckCircle from "../../../public/svg/check-circle.svg";
import XMark from "../../../public/svg/x-mark.svg";

import { Status } from "@/hooks/useToast";

const Toast = ({ t, title, body, type }: ToastProps ) => {
    console.log(t)
  return (
    <div className={`${t.visible ? 'animate-in fade-in zoom-in' : 'animate-out fade-out zoom-out'} flex max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto p-4`}>
      <div className="self-start flex-shrink-0 bg-[#D1FADF] rounded-full border-[6px] border-[#ECFDF3] p-[10px] mr-[14px]">
        <Image src={CheckCircle} alt="check-circle" width={20} />
      </div>

      <div className="self-center pr-4">
        <p className="text-[#101828] text-sm">{title}</p>
        {body && <p className="text-[#667085] text-sm font-[300]">{body}</p>}
      </div>

      <div onClick={() => toast.dismiss(t.id)} className="flex-shrink-0">
        <Image src={XMark} alt="x-mark" />
      </div>
    </div>
  );
};

export default Toast;

interface ToastProps extends Status {
    t: any
}