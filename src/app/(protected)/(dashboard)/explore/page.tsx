import Link from "next/link";
import Image from "next/image";
import Test from "../dashboard-components/Test";
import { getUser } from "@/app/api/user/getUser";
import Avatar from "../../../../../public/avatar.png"
import Menu from "../../../../../public/svg/menu.svg"
import Donate from "../../../../../public/images/donate.png"


export default async function Dashboard() {
  const user = await getUser();
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border-[#393e4614] border">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <Image src={Avatar} alt="user-avatar" />
              <div className="pl-3">
                <h3 className="text-sm font-normal text-[#344054]">Nicholas Ademide</h3>
                <h4 className="text-xs font-normal text-[#667085]">Individual</h4>
              </div>
            </div>
            <Image src={Menu} alt="menu" />
          </div>

          <div className="mt-4">
            <Image src={Donate} alt="donate" className="h-56 w-full object-center object-cover rounded-lg" />
            <div className="my-5">
              <h3 className="font-semibold text-lg">Help Nicholas go back to college</h3>
              <p className="text-sm mt-2 ">The "Help Nicholas Go Back to College" campaign aims to raise funds to support Nicholas in pursuing his higher education dreams. Nicholas is a passionate and determined individual who, due to financial constraints, had to put his college education on hold. Now, he is eager to return to college to pursue his academic goals and unlock a brighter future. <span className="text-[#667085]">See more</span></p>
              <h4 className="mt-5 text-[#667085] text-sm">40 mins ago</h4>
            </div>
            <div className="bg-[#F9F9F9]">\Hello</div>
          </div>
        </div>

        <div className="p-6 rounded-xl border-[#393e4614] border">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <Image src={Avatar} alt="user-avatar" />
              <div>
                <h3>Nicholas Ademide</h3>
                <h4>Individual</h4>
              </div>
            </div>
            <Image src={Menu} alt="menu" />
          </div>
        </div>
      </div>
    </div>
  );
}