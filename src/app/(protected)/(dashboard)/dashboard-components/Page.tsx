import { RFC } from "@/types/Component";

const Page: RFC = ({ children }) => {
  return <main className="grow overflow-y-auto pl-[38px] pr-[25px] py-[27px]">{children}</main>;
};

export default Page;
