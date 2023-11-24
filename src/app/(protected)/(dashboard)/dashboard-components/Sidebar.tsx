'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DrawerTrigger from "./DrawerTrigger";
import { pageGroups } from "../pages";
import Icon from "./Icon";

import { RFC } from "@/app/common/types";
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg";

const Sidebar: RFC<SidebarProps> = ({drawer}) => {
  const currentPath = usePathname()
  const display = drawer ? 'flex' : 'hidden md:flex'

  return (
    <nav className={display + " flex-col overflow-y-auto min-w-[272px] pl-[26px] pr-[27px]"}>
      <div className="md:hidden mt-3">
        <Image src={CrowdrLogo} alt="crowdr logo" className="w-[52px] md:w-[52px]" />
      </div>

      {pageGroups.map((pageGroup, index) => (
        <div key={index}>
        {index == 0 || <hr className=" border-[rgba(56, 56, 56, 0.08)]" />}
        <div className="py-[27px]">
          {pageGroup.map((page, index) => {
            let pageLinkStyle = "relative flex items-center font-medium text-[0.96rem] cursor-pointer rounded-[0.275rem] transition pl-[28px] pt-[14px] pb-[15px]"
            let isCurrentPage = currentPath.startsWith("/"+page.route.split("/")[1])
            let iconStyle = isCurrentPage ? "brightness-[200] mr-2" : "mr-2"

            if (index != 0) pageLinkStyle += ' mt-[10px]'
            if (isCurrentPage) {
              pageLinkStyle += ' text-white bg-[#00B964]'
            } else if (page.route) {
              pageLinkStyle += ' hover:bg-[#F8F8F8]'
            }

            return (
              <DrawerTrigger key={index} id="sidebar" type="hide">
                <Link key={index} href={page.route} className={pageLinkStyle}>
                  {page.label && <span className="absolute right-0 -top-1.5 text-[0.59rem] text-green-400 bg-green-50 rounded-md py-0.5 px-1.5">{page.label}</span>}
                  {/* <Icon name={page.icon} className="text-inherit text-xl mr-2" /> */}
                  <Image src={page.icon} width={18} height={18} alt="" className={iconStyle} />
                  {page.title}
                </Link>
              </DrawerTrigger>
            )
          })}
        </div>
      </div>
      ))}
    </nav>
  );
};

export default Sidebar;

type SidebarProps = {
  drawer?: boolean
}


