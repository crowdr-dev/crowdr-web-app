'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { pageGroups } from "../pages";
import Icon from "./Icon";
import Cloud from "../../../../../public/svg/upload-cloud.svg"

const Sidebar = () => {
  const currentPath = usePathname()

  return (
    <nav className="flex flex-col overflow-y-auto border-r-[0.7px] border-[rgba(56, 56, 56, 0.08)] w-[272px] pl-[26px] pr-[27px]">
      {pageGroups.map((pageGroup, index) => (
        <div key={index}>
        {index == 0 || <hr className=" border-[rgba(56, 56, 56, 0.08)]" />}
        <div className="py-[27px]">
          {pageGroup.map((page, index) => {
            let pageLinkStyle = "flex items-center font-medium text-[0.96rem] rounded-[0.275rem] pl-[28px] pt-[14px] pb-[15px]"
            let isCurrentPage = currentPath.startsWith(page.route)

            if (index != 0) pageLinkStyle += ' mt-[10px]'
            if (isCurrentPage) pageLinkStyle += ' text-white bg-[#00B964]'

            return (
              <Link key={index} href={page.route} className={pageLinkStyle}>
                <Icon name={page.icon} className="text-inherit text-xl mr-2" />
                {/* <Image src={Cloud} width={18} height={18} alt="icon" className="mr-2" /> */}
                {page.title}
            </Link>
            )
          })}
        </div>
      </div>
      ))}
    </nav>
  );
};

export default Sidebar;


