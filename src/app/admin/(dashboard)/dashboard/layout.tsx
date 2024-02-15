import { PropsWithChildren } from "react"
import Sidebar from "../../(dashboard)/admin-dashboard-components/Sidebar"
import Page from "../../(dashboard)/admin-dashboard-components/Page"

const AdminDashboardLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <Page {...props} />
      {/* <Page children={children} /> won't work */}
    </div>
  )
}

export default AdminDashboardLayout
