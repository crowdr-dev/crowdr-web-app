'use client'
import Header from "./dashboard-components/Header";
import Sidebar from "./dashboard-components/Sidebar";
import Page from "./dashboard-components/Page";
import UserProvider from "./common/hooks/useUser";

import { RFC } from "@/app/common/types";
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardLayout: RFC = (props) => {
  return (
    <UserProvider>
      <div className="flex flex-col h-full">
        <Header />
        <div className="flex grow overflow-hidden">
          <Sidebar />
          <Page {...props} />
        </div>
      </div>
    </UserProvider>
  );
};

export default DashboardLayout;
