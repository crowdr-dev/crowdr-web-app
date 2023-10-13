import Image from "next/image";
import { Button, GrayButton } from "./Button";

import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg";
import PuzzleIcon from "../../../../../public/svg/environment-puzzle.svg";
import BurgerIcon from "../../../../../public/svg/burger-icon.svg";
import Avatar from "../../../../../public/temp/avatar.png"
import Label from "./Label";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full min-h-[74px] border-b-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-[25px]">
      <div>
        <Image src={CrowdrLogo} alt="crowdr logo" />
      </div>
      <div className="flex items-center">
        <div className="flex mr-6">
          <GrayButton
            text="Setup Guide"
            iconUrl={PuzzleIcon}
            className="hidden md:inline-block mr-[6px]"
          />
          <Button text="Create Campaign" href="/campaigns/create-or-edit-campaign" />
        </div>

        {/* profile */}
        <div className="hidden md:flex items-center">
          <div className="mr-[15px]"><Image src={Avatar} alt="avatar" width={43} /></div>
          <div>
            <p>Ajayi Akintomiwa</p>
            <Label text="Individual" />
          </div>
        </div>

        {/* burger icon */}
        <div>
          <Image src={BurgerIcon} width={28} alt="burger icon" className="block md:hidden" />
        </div>
      </div>
    </header>
  );
};

export default Header;
