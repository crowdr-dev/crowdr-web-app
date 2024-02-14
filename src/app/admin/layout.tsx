import { PropsWithChildren } from "react"

const AdminLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full">{children}</div>
}

export default AdminLayout
