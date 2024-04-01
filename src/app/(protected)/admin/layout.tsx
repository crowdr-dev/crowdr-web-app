import { PropsWithChildren } from "react"
import Modal from "../../common/components/Modal"
import SidebarModal from "../(dashboard)/dashboard-components/SidebarModal"
import KycPopup from "./admin-dashboard-components/KycPopup"
import WithdrawalPopup from "./admin-dashboard-components/WithdrawalPopup"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      {
        <>
          {children}

          <SidebarModal id="kycPopup" position="center">
            <KycPopup />
          </SidebarModal>

          <SidebarModal id="withdrawalPopup" position="center">
            <WithdrawalPopup />
          </SidebarModal>
        </>
      }
    </div>
  )
}

export default AdminLayout
