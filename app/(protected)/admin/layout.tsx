"use client"
import UserProvider from "../(dashboard)/common/hooks/useUser"
import SidebarModal from "../(dashboard)/dashboard-components/SidebarModal"
import KycPopup from "./admin-dashboard-components/KycPopup"
import WithdrawalPopup from "./admin-dashboard-components/WithdrawalPopup"
import RejectionForm from "./admin-dashboard-components/RejectionForm"
// import Modal from "../../common/components/Modal";

import { PropsWithChildren } from "react"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
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

            <SidebarModal id="kycRejectionForm" position="center">
              <RejectionForm />
            </SidebarModal>
          </>
        }
      </div>
    </UserProvider>
  )
}

export default AdminLayout
