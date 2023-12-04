import { useEffect, useRef } from "react"
import { Drawer, DrawerOptions } from "flowbite"
import { RFC } from "@/app/common/types"

const DrawerTrigger: RFC<DrawerTriggerProps> = ({
  id,
  type = "show",
  options = {},
  children,
  override,
}) => {
  let drawer = useRef<Drawer>()

  useEffect(() => {
    const $drawerEl = document.getElementById(id)
    drawer.current = new Drawer($drawerEl, options)
  }, [])

  const trigger = () => {
    if (drawer.current) {
      const $backdropEl = document.querySelector("[drawer-backdrop]")
      drawer.current[type]()

      if (type === "show") {
        $backdropEl?.classList.remove("hidden")
      } else if (type === "hide") {
        $backdropEl?.classList.add("hidden")
      }
    }
  }

  return <span onClick={trigger}>{children}</span>
}

export default DrawerTrigger

type DrawerTriggerProps = {
  id: string
  children: React.ReactNode
  type?: "show" | "hide" | "toggle"
  options?: DrawerOptions
  override?: boolean
}
