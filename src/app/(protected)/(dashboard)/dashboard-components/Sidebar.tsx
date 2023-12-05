"use client"
import { usePathname } from "next/navigation"
import { useAtom } from "jotai"
import Link from "next/link"
import Image from "next/image"
import ModalTrigger from "./ModalTrigger"
import DrawerTrigger from "./DrawerTrigger"
import { pageGroups } from "../pages"
import { pageDrawerAtom } from "../common/atoms/page"
import Icon from "./Icon"

import { RFC } from "@/app/common/types"
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg"

const Sidebar: RFC<SidebarProps> = ({ drawer }) => {
  const [currentDrawer, setCurrentDrawer] = useAtom(pageDrawerAtom)
  const currentPath = usePathname()
  const display = drawer ? "flex" : "hidden md:flex"

  const toggleDrawer = (drawerId: string) => {
    if (drawerId) {
      if (currentDrawer === drawerId) {
        setCurrentDrawer("")
      } else {
        setCurrentDrawer(drawerId)
      }
    } else {
      setCurrentDrawer("")
    }
  }

  return (
    <nav
      className={
        display + " flex-col overflow-y-auto min-w-[272px] h-full bg-white"
      }
    >
      <div
        className={
          (drawer ? "flex" : "hidden") +
          " min-h-[62px] md:min-h-[74px] border-b-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-[25px]"
        }
      >
        <Image
          src={CrowdrLogo}
          alt="crowdr logo"
          className="w-[52px] md:w-[52px]"
        />
      </div>

      {/* TODO: MAKE SURE SIDEBAR IS SCROLLABLE WHEN NECESSARY */}
      {pageGroups.map((pageGroup, index) => (
        <div key={index} className="pl-[26px] pr-[27px]">
          {index == 0 || <hr className="border-[rgba(56, 56, 56, 0.08)]" />}

          <div className="py-[27px]">
            {pageGroup.map(({ page, title, icon, label }, index) => {
              let pageLinkStyle =
                "flex items-center flex-wrap gap-y-1 gap-x-2 font-medium text-[0.96rem] rounded-[0.275rem] transition pl-[28px] pt-[14px] pb-[15px] w-[220px]"

              const isRoute = "route" in page
              let isCurrentPage = false
              if (isRoute) {
                isCurrentPage = currentDrawer
                  ? false
                  : currentPath.startsWith("/" + page.route.split("/")[1])
              } else {
                isCurrentPage = currentDrawer === page.modalId
              }

              let iconStyle = isCurrentPage ? "brightness-[200]" : ""
              if (index !== 0) pageLinkStyle += " mt-[10px]"

              if (isCurrentPage) {
                pageLinkStyle += " text-white bg-[#00B964] cursor-pointer"
              } else if (isRoute ? page.route : page.modalId) {
                pageLinkStyle += " hover:bg-[#F8F8F8] cursor-pointer"
              } else {
                pageLinkStyle += " cursor-default"
              }

              const modalProps: any = {
                id: isRoute ? currentDrawer : page.modalId,
                type: isRoute || currentDrawer ? "hide" : "show",
              }

              const linkProps: any = {
                href: isRoute ? page.route : "",
                className: pageLinkStyle,
              }

              return (
                <ModalTrigger
                  key={title}
                  {...modalProps}
                  options={{
                    backdrop: "dynamic",
                    onShow: () => toggleDrawer(isRoute ? "" : page.modalId),
                    onHide: () => toggleDrawer(""),
                  }}
                >
                  <DrawerTrigger id="sidebar_drawer" type="hide">
                    <Link {...linkProps}>
                      <Image
                        src={icon}
                        width={18}
                        height={18}
                        alt=""
                        className={iconStyle}
                      />
                      {title}
                      {label && (
                        <span className="bg-green-100 text-green-400 text-[0.55rem] whitespace-nowrap font-semibold px-1.5 py-0.5 rounded">
                          {label}
                        </span>
                      )}
                    </Link>
                  </DrawerTrigger>
                </ModalTrigger>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

export default Sidebar

type SidebarProps = {
  drawer?: boolean
}
