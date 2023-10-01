import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

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
