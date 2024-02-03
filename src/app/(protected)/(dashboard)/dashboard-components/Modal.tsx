import { useRef } from "react"
import Sidebar from "./Sidebar"
import { RFC } from "@/app/common/types"

const Modal: RFC<ModalProps> = ({ id, children, ariaLabel }) => {
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-hidden="true"
      className="fixed top-0 left-0 z-40 h-screen w-min overflow-y-auto transition-transform -translate-x-full bg-white"
    >
      {children}
    </div>
  )
}

export default Modal

type ModalProps = {
  id: string
  children: React.ReactNode
  ariaLabel?: string
}

export const SidebarModal: RFC<SidebarModalProps> = ({
  id,
  children,
  ariaLabel,
  position = "center",
}) => {
  const isCenter = position === "center"
  const modalClasses = isCenter
    ? "items-center justify-center"
    : "!justify-end md:!justify-between items-stretch"
  return (
    <div
      id={id}
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-hidden="true"
      className={
        `fixed top-0 left-0 hidden h-screen w-screen z-[45] ` + modalClasses
      }
    >
      {/* <div className="fixed flex justify-end md:justify-between h-full w-full pointer-events-none z-[60]"> */}
      {position === "right" && (
        <div className="hidden md:block h-full ">
          <Sidebar drawer />
        </div>
      )}

      {!isCenter ? (
        <SidebarModalContent>{children}</SidebarModalContent>
      ) : (
        children
      )}
      {/* </div> */}
    </div>
  )
}

type SidebarModalProps = {
  id: string
  children: React.ReactNode
  ariaLabel?: string
  position?: "center" | "right"
}

// BUG: BACKGROUND CONTENT IS SCROLLED UP WHEN SIDEBAR MODAL IS ACTIVATED
const SidebarModalContent: RFC = ({ children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null)
  const boxShadow =
    "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)"

  return (
    <div
      ref={modalContentRef}
      style={{ boxShadow }}
      className="w-min bg-white h-full animate-[slide-in-right_0.2s_ease]"
    >
      {children}
    </div>
  )
}
