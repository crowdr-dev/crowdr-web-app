import Link from "next/link";
import Image from "next/image";
import Test from "../dashboard-components/Test";
import { getUser } from "@/app/api/user/getUser";
import Avatar from "../../../../../public/avatar.png";
import Menu from "../../../../../public/svg/menu.svg";
import Donate from "../../../../../public/images/donate.png";
import ProgressBar from "../dashboard-components/ProgressBar";
import { Button } from "../dashboard-components/Button";

const PROGRESS_COUNT = 8;

export default async function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl text-black">Welcome to Crowdr, Akintomiwa! 💚</h3>
          <p className="text-sm text-[#61656B]">Explore campaigns and spread love by donating. </p>
        </div>
        <div>
          Hello
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 min-w-full">
        <div className="p-6 rounded-xl border-[#393e4614] border">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <Image src={Avatar} alt="user-avatar" />
              <div className="pl-3">
                <h3 className="text-sm font-normal text-[#344054]">Nicholas</h3>
                <h4 className="text-xs font-normal text-[#667085]">
                  Individual
                </h4>
              </div>
            </div>
            <Image src={Menu} alt="menu" />
          </div>

          <div className="mt-4">
            <Image
              src={Donate}
              alt="donate"
              className="h-56 object-center object-cover rounded-lg"
            />
            <div className="my-5">
              <h3 className="font-semibold text-lg">
                Help Nicholas go back to college
              </h3>
              <p className="text-sm mt-2 ">
                The "Help Nicholas Go Back to College" campaign aims to raise
                funds to support Nicholas in pursuing his higher education
                dreams. Nicholas is a passionate and determined individual who,
                due to financial constraints, had to put his college education
                on hold. Now, he is eager to return to college to pursue his
                academic goals and unlock a brighter future.{" "}
                <span className="text-[#667085]">See more</span>
              </p>
              <h4 className="mt-5 text-[#667085] text-sm">40 mins ago</h4>
            </div>
            <div className="bg-[#F9F9F9] p-4">
              <p className="text-sm text-[#667085]">
                {" "}
                <span className="text-[#000]">Goal</span> £6,700/£6,700
              </p>
              <ProgressBar
                bgcolor="#00B964"
                progress={(PROGRESS_COUNT / 10) * 100}
              />
            </div>
          </div>

          <Button text="Donate" className="w-full mt-4 text-center" href="/donate-or-volunteer" />
        </div>

        <div className="p-6 rounded-xl border-[#393e4614] border">
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <Image src={Avatar} alt="user-avatar" />
              <div className="pl-3">
                <h3 className="text-sm font-normal text-[#344054]">Nicholas</h3>
                <h4 className="text-xs font-normal text-[#667085]">
                  Individual
                </h4>
              </div>
            </div>
            <Image src={Menu} alt="menu" />
          </div>

          <div className="mt-4">
            <Image
              src={Donate}
              alt="donate"
              className="h-56 object-center object-cover rounded-lg"
            />
            <div className="my-5">
              <h3 className="font-semibold text-lg">
                Help Nicholas go back to college
              </h3>
              <p className="text-sm mt-2 ">
                The "Help Nicholas Go Back to College" campaign aims to raise
                funds to support Nicholas in pursuing his higher education
                dreams. Nicholas is a passionate and determined individual who,
                due to financial constraints, had to put his college education
                on hold. Now, he is eager to return to college to pursue his
                academic goals and unlock a brighter future.{" "}
                <span className="text-[#667085]">See more</span>
              </p>
              <h4 className="mt-5 text-[#667085] text-sm">40 mins ago</h4>
            </div>
            <div className="bg-[#F9F9F9] p-4">
              <p className="text-sm text-[#667085]">
                {" "}
                <span className="text-[#000]">Goal</span> £6,700/£6,700
              </p>
              <ProgressBar
                bgcolor="#00B964"
                progress={(PROGRESS_COUNT / 10) * 100}
              />
            </div>
          </div>

          <Button text="Donate" className="w-full mt-4 text-center" href="/donate-or-volunteer" />
        </div>
      </div>
    </div >
  );
}
