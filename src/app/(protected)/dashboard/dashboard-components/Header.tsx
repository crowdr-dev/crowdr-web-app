import Image from "next/image";
import { Button, LightButton } from "./Button";

import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg";
import PuzzleIcon from "../../../../../public/svg/environment-puzzle.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full h-[74px] border-b-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-[25px]">
      <div>
        <Image src={CrowdrLogo} alt="crowdr logo" />
      </div>
      <div>
        <div className="flex">
          <LightButton
            text="Setup Guide"
            iconUrl={PuzzleIcon}
            className="mr-[6px]"
          />
          <Button text="Create Campaign" href="/" />
        </div>

        {/* profile */}
        <div className="flex"></div>
      </div>
    </header>
  );
};

export default Header;
