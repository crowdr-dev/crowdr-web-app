import Page from "./dashboard-components/Page";
import Sidebar from "./dashboard-components/Sidebar";
import Header from "./dashboard-components/Header";

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
