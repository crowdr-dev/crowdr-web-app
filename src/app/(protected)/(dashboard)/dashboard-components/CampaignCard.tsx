import ProgressBar from "./ProgressBar"
import { GrayButton } from "./Button"
import { label } from "./Label"
import { pill } from "./Pill"
import { formatAmount } from "../utils/currency"
import { getDuration } from "../utils/date"

import { ICampaign } from "@/app/common/types/Campaign"
import { RFC } from "@/app/common/types"

const CampaignCard: RFC<CampaignCardProps> = ({ campaign }) => {
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

type CampaignCardProps = {
  campaign: ICampaign
}
