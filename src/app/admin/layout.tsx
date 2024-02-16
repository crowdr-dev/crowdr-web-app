import { PropsWithChildren } from "react"
import Modal from "../common/components/Modal"
import KycPopup from "./(dashboard)/admin-dashboard-components/KycPopup"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      {
        <>
          {children}

          <Modal id="kycPopup">
            <KycPopup />
          </Modal>
        </>
      }
    </div>
  )
}

export default AdminLayout
