import Link from "next/link";
import Image from "next/image";
import Test from "../dashboard-components/Test";
import { getUser } from "@/app/api/user/getUser";
import Avatar from "../../../../../public/avatar.png";
import Menu from "../../../../../public/svg/menu.svg";
import Donate from "../../../../../public/images/donate.png";
import ProgressBar from "../dashboard-components/ProgressBar";
import Filter from "../dashboard-components/Filter";
import { Button } from "../dashboard-components/Button";
import ExploreCard from "../dashboard-components/ExploreCard"

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
          <Filter query="Trending"/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 min-w-full">
      <ExploreCard
          
          name="Nicholas"
  tier="Individual"
  header="Help Nicholas go back to college"
  subheader="The `Help Nicholas Go Back to College` campaign aims to raise
  funds to support Nicholas in pursuing his higher education
  dreams. Nicholas is a passionate and determined individual who,
  due to financial constraints, had to put his college education
  on hold. Now, he is eager to return to college to pursue his
  academic goals and unlock a brighter future."
  totalAmount="7,700"
  currentAmount="6,000"
  donateImage={Donate}
  routeTo={"/explore/donate-or-volunteer"}
  avatar={Avatar}
          
          />
        

        <ExploreCard
          
          name="Nicholas"
  tier="Individual"
  header="Help Nicholas go back to college"
  subheader="The `Help Nicholas Go Back to College` campaign aims to raise
  funds to support Nicholas in pursuing his higher education
  dreams. Nicholas is a passionate and determined individual who,
  due to financial constraints, had to put his college education
  on hold. Now, he is eager to return to college to pursue his
  academic goals and unlock a brighter future."
  totalAmount="7,700"
  currentAmount="6,000"
  donateImage={Donate}
  routeTo={"/explore/donate-or-volunteer"}
  avatar={Avatar}
          
          />
      </div>
    </div >
  );
}
