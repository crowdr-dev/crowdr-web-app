import { RFC } from "@/app/common/types";

const Page: RFC = ({ children }) => {
  return <main className="grow overflow-y-auto overflow-x-hidden border-l-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-5 md:px-8 pt-[9px] md:pt-[27px] pb-[27px]">{children}</main>;
};

export default Page;
