"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { pages } from "../pages"

import { RFC } from "@/app/common/types"
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg"
import CrowdrLogoType from "../../../../../public/svg/crowdr-logo.svg"

const Sidebar = () => {
  const currentPath = usePathname()

  return (
    <nav className="flex-col overflow-y-auto max-w-[272px] shrink-0 h-full bg-white">
      <div className="flex items-center min-h-[62px] md:min-h-[74px] px-[25px]">
        <Image
          src={CrowdrLogo}
          alt="crowdr logo"
          className="w-[52px] md:w-[52px]"
        />
        <Image
          src={CrowdrLogoType}
          alt="crowdr logotype"
          className="w-[52px] md:w-[52px]"
        />
      </div>

      {pages.map(({ route, title, icon, label }, index) => {
        let pageLinkStyle =
          "flex items-center flex-wrap gap-y-1 gap-x-2 font-medium text-[0.96rem] rounded-[0.275rem] transition cursor-pointer pl-[28px] pt-[14px] pb-[15px] w-[220px]"
        const isCurrentPage = currentPath.startsWith("/" + route.split("/")[1])

        let iconStyle = isCurrentPage ? "brightness-[200]" : ""
        if (index !== 0) pageLinkStyle += " mt-[10px]"

        if (isCurrentPage) {
          pageLinkStyle += " text-white bg-[#00B964]"
        } else {
          pageLinkStyle += " hover:bg-[#F8F8F8]"
        }

        return (
          <Link key={index} href={route} className={pageLinkStyle}>
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
        )
      })}
    </nav>
  )
}

export default Sidebar
