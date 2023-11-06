'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DrawerTrigger from "./DrawerTrigger";
import { pageGroups } from "../pages";

import Icon from "./Icon";
import Cloud from "../../../../../public/svg/upload-cloud.svg"
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg";
import { RFC } from "@/types/Component";

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
            let pageLinkStyle = "flex items-center font-medium text-[0.96rem] rounded-[0.275rem] pl-[28px] pt-[14px] pb-[15px]"
            let isCurrentPage = currentPath.startsWith("/"+page.route.split("/")[1])

            if (index != 0) pageLinkStyle += ' mt-[10px]'
            if (isCurrentPage) pageLinkStyle += ' text-white bg-[#00B964]'

            return (
              <DrawerTrigger key={index} id="sidebar" type="hide">
                <Link key={index} href={page.route} className={pageLinkStyle}>
                  <Icon name={page.icon} className="text-inherit text-xl mr-2" />
                  {/* <Image src={Cloud} width={18} height={18} alt="icon" className="mr-2" /> */}
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


