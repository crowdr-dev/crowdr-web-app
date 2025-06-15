"use client"
import { useEffect, useState } from "react"
import { useUser } from "../common/hooks/useUser"
import Tabs from "../dashboard-components/Tabs"
import { RFC } from "../../../common/types"

const SettingsLayout: RFC = ({ children }) => {
  const [settingsPages, setSettingsPages] = useState<typeof pages>()
  const user = useUser()

  useEffect(() => {
    if (user && user.userType === "non-profit") {
      setSettingsPages(pages)
    } else {
      const pagesToDisplay = pages.filter(
        (page) => page.title !== "Organization"
      )
      setSettingsPages(pagesToDisplay)
    }
  }, [user])

  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      {settingsPages && (
        <Tabs styles={{ header: "-mx-5 md:mx-0" }}>
          {settingsPages.map((page, index) => (
            <Tabs.Item key={index} heading={page.title} href={page.route}>
              {children}
            </Tabs.Item>
          ))}
        </Tabs>
      )}
    </div>
  )
}

export default SettingsLayout

let pages = [
  {
    route: "/settings/profile",
    title: "Profile",
  },
  {
    route: "/settings/organization",
    title: "Organization",
  },
  {
    route: "/settings/password",
    title: "Password",
  },
  {
    route: "/settings/payment",
    title: "Payment and Payouts",
  },
  {
    route: "/settings/verification",
    title: "Verification",
  },
]
