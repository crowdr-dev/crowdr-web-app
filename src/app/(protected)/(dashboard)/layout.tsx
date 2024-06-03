"use client";
import Header from "./dashboard-components/Header";
import Sidebar from "./dashboard-components/Sidebar";
import Page from "./dashboard-components/Page";
import UserProvider from "./common/hooks/useUser";
import { NotificationProvider } from "./common/hooks/useNotification";

import { RFC } from "@/app/common/types";
import { PropsWithChildren } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardLayout: RFC = (props: PropsWithChildren) => {
  return (
    <UserProvider>
      <NotificationProvider>
        <div className="flex flex-col h-full font-satoshi">
          <Header />
          <div className="flex grow overflow-hidden">
            <Sidebar />
            <Page {...props} />
            {/* <Page children={children} /> won't work */}
          </div>
        </div>
      </NotificationProvider>
    </UserProvider>
  );
};

export default DashboardLayout;
