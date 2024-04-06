"use client";
import { PropsWithChildren } from "react";
import Modal from "../../common/components/Modal";
import SidebarModal from "../(dashboard)/dashboard-components/SidebarModal";
import KycPopup from "./admin-dashboard-components/KycPopup";
import WithdrawalPopup from "./admin-dashboard-components/WithdrawalPopup";
import UserProvider from "../(dashboard)/common/hooks/useUser";

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
          </>
        }
      </div>
    </UserProvider>
  );
};

export default AdminLayout;
