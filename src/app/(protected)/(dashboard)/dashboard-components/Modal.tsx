import Sidebar from "./Sidebar";
import { RFC } from "@/app/common/types";

const Modal: RFC<ModalProps> = ({ id, children, ariaLabel }) => {
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-hidden="true"
      aria-label={ariaLabel}
      className="fixed top-0 left-0 z-40 h-screen w-min overflow-y-auto transition-transform -translate-x-full bg-white"
    >
      {children}
    </div>
  );
};

export default Modal;

type ModalProps = {
  id: string;
  children: React.ReactNode;
  ariaLabel?: string
};

export const SidebarModal: RFC<SidebarModalProps> = ({
  id,
  children,
  ariaLabel,
}) => {
  return (
    <div
      id={id}
      className="fixed top-0 left-0 hidden !justify-end md:!justify-between items-stretch z-[45] h-screen w-screen"
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-hidden="true"
    >
      {/* <div className="fixed flex justify-end md:justify-between h-full w-full pointer-events-none z-[60]"> */}
        <div className="hidden md:block h-full">
          <Sidebar drawer />
        </div>
        <div className="w-min bg-white">
          {children}
        </div>
      {/* </div> */}
    </div>
  )
}

type SidebarModalProps = {
  id: string
  children: React.ReactNode
  ariaLabel?: string
}
