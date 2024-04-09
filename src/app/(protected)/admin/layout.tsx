"use client";
import { useAtomValue } from "jotai";
import UserProvider from "../(dashboard)/common/hooks/useUser";
import SidebarModal from "../(dashboard)/dashboard-components/SidebarModal";
import KycPopup from "./admin-dashboard-components/KycPopup";
import WithdrawalPopup from "./admin-dashboard-components/WithdrawalPopup";
import RejectionForm from "./admin-dashboard-components/RejectionForm";
import { modalStoreAtom } from "@/app/common/components/ModalTrigger";
// import Modal from "../../common/components/Modal";

import { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const modalStore = useAtomValue(modalStoreAtom)

  const closeRejectionForm = () => {
    const modal = modalStore.get("kycRejectionForm")
    modal?.hide()
  }
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
              <RejectionForm clearModal={closeRejectionForm} />
            </SidebarModal>
          </>
        }
      </div>
    </UserProvider>
  );
};

export default AdminLayout;
