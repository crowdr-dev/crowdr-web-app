import Header from "./dashboard-components/Header";
import Sidebar from "./dashboard-components/Sidebar";
import Page from "./dashboard-components/Page";

import { RFC } from "@/types/Component";

const DashboardLayout: RFC = (props) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex grow">
        <Sidebar />
        <Page {...props} />
      </div>
    </div>
  );
};

export default DashboardLayout;
