import { RFC } from "@/types/Component";

const Page: RFC = ({ children }) => {
  return <main className="grow overflow-x-auto pl-[38px] pr-[25px] pt-[27px]">{children}</main>;
};

export default Page;
