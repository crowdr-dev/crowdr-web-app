import { PropsWithChildren } from "react"
import Modal from "../common/components/Modal"
import SidebarModal from "../(protected)/(dashboard)/dashboard-components/SidebarModal"
import KycPopup from "./(dashboard)/admin-dashboard-components/KycPopup"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      {
        <>
          {children}

          <SidebarModal id="kycPopup" position="center">
            <KycPopup />
          </SidebarModal>
        </>
      }
    </div>
  )
}

export default AdminLayout
