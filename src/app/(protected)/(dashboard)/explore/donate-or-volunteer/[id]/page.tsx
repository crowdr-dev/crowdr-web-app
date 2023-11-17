"use client";

import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";
import Test from "../../../dashboard-components/Test";
import { getUser } from "@/app/api/user/getUser";
import ProgressBar from "../../../dashboard-components/ProgressBar";
import ExploreCard from "../../../dashboard-components/ExploreCard";
import Filter from "../../../dashboard-components/Filter";
import Input from "../../../dashboard-components/Input";
import Checkbox from "../../../dashboard-components/Checkbox";
import Select from "../../../dashboard-components/Select";
import { Button } from "../../../dashboard-components/Button";
import { getSingleCampaign } from "@/app/api/campaigns/getCampaigns";
import { CampaignProps } from "../../page";


const PROGRESS_COUNT = 8;

const activeTabStyle = "text-[#00B964]  border-b-2 border-[#00B964]";
const inActiveTabStyle = "text-[#667085]";
const genderOptions = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
];

const ageRange = [
  {
    name: "18 - 25",
    value: "18 - 25",
  },
  {
    name: "26 - 35",
    value: "26 - 35",
  },
  {
    name: "36 - 45",
    value: "36 - 45",
  },
  {
    name: "46 - 55",
    value: "46 - 55",
  },
  {
    name: "56 and above",
    value: "56 and above",
  },
];

export default function DonateOrVolunteer({params}:{params: {id: string}}) {
  const [tab, setTab] = useState("donate");
  const [campaign, setCampaign] = useState<any>()


const fetchSingleCampaign = async () => {
  const singleCampaign = await getSingleCampaign(params.id);
  setCampaign(singleCampaign)
}

useEffect(() => {
  fetchSingleCampaign()
},[params.id])

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl text-black font-semibold">
            {campaign?.campaignType==="fundraise"? "Donate" : "Volunteer"}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 min-w-full md:grid-cols-2">
      <ExploreCard
            name='Nicholas'
            tier='Individual'
            header={campaign?.title}
            subheader={campaign?.story}
            totalAmount={campaign?.fundraise?.fundingGoalDetails[0].amount}
            currentAmount={6000}
            timePosted={campaign?.fundraise?.startOfFundraise}
            slideImages={[campaign?.campaignCoverImage?.url, ...(campaign?.campaignAdditionalImagesUrl || [])]}
            donateImage={
              campaign?.campaignCoverImage?.url
            }
            routeTo={`/explore/`}
            avatar={"https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg"}
            campaignType={campaign?.campaignType}
          />
        <div>
          <div>
            {
              campaign?.campaignType==="fundraise"?<span
              className={`text-sm p-3 ${
                tab === "donate" ? activeTabStyle : inActiveTabStyle
              }`}
              onClick={() => {
                setTab("donate");
              }}
            >
              Donate
            </span>:
            <span
              className={`text-sm p-3 ml-4 ${
                tab === "volunteer" ? activeTabStyle : inActiveTabStyle
              }`}
              onClick={() => {
                setTab("volunteer");
              }}
            >
              Volunteer
            </span>
            }
            
          </div>
          <hr className="mt-[9px]" />

          {tab === "volunteer" ? (
            <div className="mt-6">
              <div className="bg-[#F9F9F9] p-4">
                <p className="text-sm text-[#667085]">
                  {" "}
                  <span className="text-[#000]">Goal</span> 35/70 Volunteers
                </p>
                <ProgressBar
                  bgColor="#00B964"
                  percent={(PROGRESS_COUNT / 10) * 100}
                />
                <p className="mt-3 text-sm opacity-50">240 applications</p>
              </div>

              <h3 className="mt-2 text-base">Apply</h3>
              <div className="mt-4">
                <Input
                  label={"Full name"}
                  placeholder="Ajayi Akintomiwa G."
                  name="fullName"
                  id="fullName"
                />
                <Input
                  label={"Email address"}
                  placeholder="tomiwa@crowdr.com"
                  name="emailAddress"
                  id="emailAddress"
                />
                <Select
                  label={"Gender"}
                  name="gender"
                  id="gender"
                  options={genderOptions}
                />

                <Select
                  label={"Age Range"}
                  name="ageRange"
                  id="ageRange"
                  options={ageRange}
                />

                <Input
                  label={"Address"}
                  placeholder="Lagos, NG"
                  name="address"
                  id="address"
                />
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="bio"
                    className="text-[14px] text-[#344054] mb-[6px]"
                  >
                    Tell us a bit about yourself and why you’re interested in
                    this project!
                  </label>
                  <textarea
                    id="bio"
                    className="w-full text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                  />
                </div>
              </div>

              <Button text="Apply" className="w-full mt-4 !justify-center" />
            </div>
          ) : (
            <div className="mt-6">
              <div className="bg-[#F9F9F9] p-4">
                <p className="text-sm text-[#667085]">
                  {" "}
                  <span className="text-[#000]">Goal</span> 35/70 Volunteers
                </p>
                <ProgressBar
                  bgColor="#00B964"
                  percent={(PROGRESS_COUNT / 10) * 100}
                />
                <p className="mt-3 text-sm opacity-50">240 applications</p>
              </div>

              <div className="mt-4">
                <p className="text-base">Donation Amount</p>
                <div className="text-sm rounded-lg border border-[#D0D5DD] py-[10px] px-[14px] ">
                  N20,000.00
                </div>
              </div>

              <div className="mt-4">
                <Input
                  label={"Full name"}
                  placeholder="Ajayi Akintomiwa G."
                  name="fullName"
                  id="fullName"
                />
                <Input
                  label={"Email address"}
                  placeholder="tomiwa@crowdr.com"
                  name="emailAddress"
                  id="emailAddress"
                />
                <div className="flex flex-col mt-[30px]">
                  <Checkbox
                    id={"1"}
                    label={"Don't display my name publicly on the fundraiser."}
                  />
                  <Checkbox
                    id={"2"}
                    label={
                      "I'm delighted to share my name and email with this charity to receive updates on other ways I can help."
                    }
                  />
                  <Checkbox
                    id={"3"}
                    label={
                      "Get occasional marketing updates from Crowdr. You may unsubscribe at any time."
                    }
                  />
                </div>
              </div>

              <Button text="Donate" className="w-full mt-4 !justify-center" />

              <div className="mt-10">
                <div className="flex flex-row items-start justify-between">
                  <p className="text-[#292A2E] text-base">32 Total Donors</p>

                  <Filter query="Top Donors" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

