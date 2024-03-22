"use client"
import { usePathname } from "next/navigation"
import { atom, useAtom } from "jotai"
import Link from "next/link"
import Image from "next/image"
import ModalTrigger from "../../../common/components/ModalTrigger"
import DrawerTrigger from "../../../common/components/DrawerTrigger"
import { useNotification } from "../common/hooks/useNotification"
import { pageGroups } from "../pages"
import Icon from "./Icon"

import { RFC } from "@/app/common/types"
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg"

export const pageDrawerAtom = atom("")

const Sidebar: RFC<SidebarProps> = ({ drawer }) => {
  const [currentDrawerId, setCurrentDrawerId] = useAtom(pageDrawerAtom)
  const currentPath = usePathname()
  const { fetchNotifications } = useNotification()
  const display = drawer ? "flex" : "hidden md:flex"

  const toggleDrawer = (drawerId: string) => {
    if (drawerId) {
      if (currentDrawerId === drawerId) {
        // setCurrentDrawerId("")
      } else {
        setCurrentDrawerId(drawerId)
      }
    } else {
      setCurrentDrawerId("")
    }

    if (drawerId === 'notifications') {
      fetchNotifications()
    }
  }

  return (
    <nav
      className={
        display + " flex-col overflow-y-auto max-w-[272px] shrink-0 h-full bg-white"
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
              if (isRoute) { // IF IT'S A ROUTE AND A DRAWER IS CURRENTLY ACTIVE, IT ISN'T THE CURRENT PAGE.
                isCurrentPage = currentDrawerId // OR ELSE CHECK IF THE ROUTE PATH MATCHES WITH THE CURRENT URL PATH
                  ? false
                  : currentPath.startsWith("/" + page.route.split("/")[1])
              } else if (!page.noHighlight) {
                isCurrentPage = currentDrawerId === page.modalId
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

              let modalProps: any = { // IF IT'S A ROUTE AND THERE'S AN ACTIVE DRAWER, HIDE THE DRAWER
                id: isRoute ? currentDrawerId : (isCurrentPage ? '' : page.modalId),
                type: isRoute || currentDrawerId ? "hide" : "show",
              }

              // if (!isRoute && isCurrentPage) {
              //   modalProps = {}
              // }

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
                    onHide: () => toggleDrawer(""),
                    onShow: () => toggleDrawer(isRoute ? "" : page.modalId),
                    backdropClasses: "bg-[#50556F] bg-opacity-30 fixed inset-0 z-40"
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
