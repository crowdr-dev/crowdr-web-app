import toast from "react-hot-toast";
import Image from "next/image";
import CheckCircle from "../../../public/svg/check-circle.svg";
import XMark from "../../../public/svg/x-mark.svg";
import { Status } from "@/hooks/useToast";

const Toast = ({ t, title, body, type }: Status & { t: any }) => {
  return (
    <div className="flex max-w-md rounded-lg p-4 shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.05),_0px_12px_16px_-4px_rgba(16,24,40,0.10)] animate-enter">
      <div className="self-start flex-shrink-0 bg-[#D1FADF] rounded-full border-[6px] border-[#ECFDF3] p-[10px] mr-[14px]">
        <Image src={CheckCircle} alt="check-circle" width={20} />
      </div>

      <div className="pr-4">
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
