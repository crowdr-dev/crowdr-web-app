import Link from "next/link"
import { mapCampaignResponseToView } from "../common/utils/campaign"
import ProgressBar from "./ProgressBar"
import { GrayButton } from "../../../common/components/Button"
import { label } from "./Label"
import { pill } from "./Pill"

import { RFC } from "@/app/common/types"
import { IFundraiseVolunteerCampaign } from "@/app/common/types/Campaign"

const CampaignCard: RFC<CampaignCardProps> = ({ campaign }) => {
  const {
    _id,
    title,
    category,
    duration,
    status,
    views,
    donors,
    volunteers,
    fundingGoal,
    fundsGotten,
    percentage,
    campaignType,
  } = mapCampaignResponseToView(campaign)

  const isVolunteerCampaign = campaignType === "volunteer"

  return (
    <Link
      href={`campaigns/${_id}`}
      className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl px-[10px] pt-6 pb-[10px] md:py-[26px] md:px-6"
    >
      <div className="px-[7px] md:px-0">
        <div className="mb-2 md:mb-[10px]">{label(status)}</div>
        <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-[19px]">
          <p className="text-lg text-black mb-2 md:mb-0">{title}</p>
          {pill(category)}
        </div>
      </div>

      {percentage !== undefined ? (
        <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[12px] md:mb-3">
          <p className="text-sm text-[#667085] mb-1">
            <span className="text-[#292A2E]">Goal</span> {fundsGotten}/
            {fundingGoal}
          </p>
          <ProgressBar percent={percentage} showValue />
        </div>
      ) : (
        <div className="h-20 m-3" />
      )}

      <div className="flex flex-col md:flex-row justify-between md:items-end">
        <div className="text-[13px] text-[#5C636E] px-[7px] md:px-0 mb-2.5">
          <p className="mb-2.5">
            <span className="text-black font-medium">Views:</span>{" "}
            <span className="text-[#5C636E] font">{views}</span>
          </p>
          <p className="mb-2.5">
            <span className="text-black font-medium">
              {!isVolunteerCampaign ? "Donors:" : "Volunteers:"}
            </span>{" "}
            <span>{!isVolunteerCampaign ? donors : volunteers}</span>
          </p>
          <p>
            <span className="text-black font-medium">Duration:</span>{" "}
            <span>{duration}</span>
          </p>
        </div>
        <GrayButton
          href={`/campaigns/create-or-edit-campaign/${_id}`}
          text="Update campaign"
          textColor="#667085"
          outlineColor="transparent"
          className="self-end !px-7 !h-[44px]"
        />
      </div>
    </Link>
  )
}

export default CampaignCard

type CampaignCardProps = {
  campaign: IFundraiseVolunteerCampaign
}
