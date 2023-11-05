import { RFC } from "@/types/Component";

const Page: RFC = ({ children }) => {
  return <main className="grow overflow-y-auto border-l-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-5 md:pl-[38px] md:pr-[25px] py-[27px]">{children}</main>;
};

export default Page;
