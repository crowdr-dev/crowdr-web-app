import ProgressBar from "./ProgressBar"
import { GrayButton } from "./Button"
import Skeleton from "react-loading-skeleton"
import { label } from "./Label"
import { pill } from "./Pill"
import { formatAmount } from "../common/utils/currency"
import { getDuration } from "../common/utils/date"

import { ICampaign } from "@/app/common/types/Campaign"
import { RFC } from "@/app/common/types"

const CampaignCard: CampaignCard = ({ campaign }) => {
  const {
    title,
    category,
    campaignStatus,
    campaignViews,
    allDonors,
    fundraise,
  } = campaign
  const { fundingGoalDetails, startOfFundraise, endOfFundraise } = fundraise
  const fundingGoals = fundingGoalDetails[0]
  const duration = getDuration(startOfFundraise, endOfFundraise)

  return (
    <div className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl py-[26px] px-[24px]">
      <div className="mb-2 md:mb-[10px]">{label(campaignStatus)}</div>

      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-[19px]">
        <p className="text-lg text-black mb-2 md:mb-0">{title}</p>
        {pill(category)}
      </div>

      <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[10px] md:mb-3">
        <p className="text-sm text-[#667085] mb-1">
          <span className="text-[#292A2E]">Goal</span>{" "}
          {formatAmount(fundingGoals.amount, fundingGoals.currency)}/N000,000
        </p>
        <ProgressBar percent={70} showValue />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-end">
        <div className="text-[13px] text-[#5C636E] mb-2.5">
          <p className="mb-2.5">
            <span className="text-black font-medium">Views:</span>{" "}
            <span className="text-[#5C636E] font">{campaignViews}</span>
          </p>
          <p className="mb-2.5">
            <span className="text-black font-medium">Donors:</span>{" "}
            <span>{allDonors}</span>
          </p>
          <p>
            <span className="text-black font-medium">Duration:</span>{" "}
            <span>{duration}</span>
          </p>
        </div>
        <GrayButton
          href={`/campaigns/create-or-edit-campaign/${campaign._id}`}
          text="Update campaign"
          textColor="#667085"
          outlineColor="transparent"
          className="self-end !px-7"
        />
      </div>
    </div>
  )
}

export default CampaignCard

type CampaignCard = RFC<CampaignCardProps> & { Skeleton: RFC }

type CampaignCardProps = {
  campaign: ICampaign
}

CampaignCard.Skeleton = () => {
  return (
    <div className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl py-[26px] px-[24px]">
      <div className="mb-2 md:mb-[10px]">
        <Skeleton width={90} height={25} borderRadius={100} />
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-[19px]">
        <Skeleton width={220} height={20} containerClassName="mb-2 md:mb-0" />
        <Skeleton width={105} height={35} borderRadius={100} />
      </div>

      <div className="mb-[10px] md:mb-3">
        <Skeleton height={80} borderRadius={8} />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-end">
        <div className="mb-2.5">
          <Skeleton width={70} height={15} containerClassName="block" />
          <Skeleton width={70} height={15} containerClassName="block" />
          <Skeleton width={95} height={15} />
        </div>
        <Skeleton width={165} height={35} containerClassName="self-end" />
      </div>
    </div>
  )
}
