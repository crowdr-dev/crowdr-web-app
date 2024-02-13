import { PropsWithChildren } from "react"
import Sidebar from "./(dashboard)/admin-dashboard-components/Sidebar"
import Page from "./(dashboard)/admin-dashboard-components/Page"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <Page children={children} />
    </div>
  )
}

export default AdminLayout
