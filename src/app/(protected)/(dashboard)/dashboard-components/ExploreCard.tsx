import React from 'react'
import Image from "next/image";
import { RFC } from "@/types/Component";
import { Button } from "./Button";
import ProgressBar from "./ProgressBar";


import Menu from "../../../../../public/svg/menu.svg";




type ExploreCardProps = {
  name: string;
  tier: string;
  header?: string;
  subheader?: string;
  totalAmount: string;
  currentAmount: string;
  donateImage: any;
  routeTo?: string;
  avatar?: string;
}


const ExploreCard: RFC<ExploreCardProps> = (props) => {
  const { name, tier, avatar, header, subheader, totalAmount, currentAmount, donateImage, routeTo } = props
  const progress = parseInt(currentAmount) / parseInt(totalAmount)
  return (
    <div className="p-6 rounded-xl border-[#393e4614] border">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <Image src={avatar} alt="user-avatar" />
          <div className="pl-3">
            <h3 className="text-sm font-normal text-[#344054]">{name}</h3>
            <h4 className="text-xs font-normal text-[#667085]">
              {tier}
            </h4>
          </div>
        </div>
        <Image src={Menu} alt="menu" />
      </div>

      <div className="mt-4">
        <Image
          src={donateImage}
          alt="donate"
          className="h-56 object-center object-cover rounded-lg"
        />
        <div className="my-5">
          <h3 className="font-semibold text-lg">
            {header}
          </h3>
          <p className="text-sm mt-2 ">
            {subheader}
            <span className="text-[#667085]">See more</span>
          </p>
          <h4 className="mt-5 text-[#667085] text-sm">40 mins ago</h4>
        </div>
        <div className="bg-[#F9F9F9] p-4">
          <p className="text-sm text-[#667085]">
            {" "}
            <span className="text-[#000]">Goal</span> £{currentAmount}/£{totalAmount}
          </p>
          <ProgressBar
            bgcolor="#00B964"
            progress={(progress) * 100}
          />
        </div>
      </div>

      <Button text="Donate" className="w-full mt-4 text-center" href={routeTo} />
    </div>
  )
}

export default ExploreCard