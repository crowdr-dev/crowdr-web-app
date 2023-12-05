import { SidebarModal } from "./Modal"
import { RFC } from "@/app/common/types"

const Page: RFC = ({ children }) => {
  return (
    <>
      <main className="grow overflow-y-auto overflow-x-hidden border-l-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-5 md:pl-[38px] md:pr-[25px] pt-[9px] md:pt-[27px] pb-[27px]">
        {children}
      </main>

      <SidebarModal id="notifications">
        <div className="w-64 bg-white text-6xl">hello world</div>
      </SidebarModal>
    </>
  )
}

export default Page
