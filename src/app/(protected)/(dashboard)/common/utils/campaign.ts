import { formatAmount } from "./currency"
import { getDuration } from "./date"

import { ICampaign } from "@/app/common/types/Campaign"

export const mapCampaignResponseToView = (data: ICampaign) => {
  const {
    _id,
    title,
    story,
    category,
    campaignStatus,
    campaignViews,
    campaignType,
  } = data

  let fundingGoal,
    fundsGotten,
    percentage,
    allDonors,
    allVolunteers,
    duration

  if (campaignType === "fundraise") {
    const [fundingGoalDetail] = data.fundraise.fundingGoalDetails
    fundingGoal = formatAmount(
      fundingGoalDetail.amount,
      fundingGoalDetail.currency
    )
    fundsGotten = `${fundingGoal[0]}5,000` // temporary
    percentage = Math.floor((5000 / fundingGoalDetail.amount) * 100)

    duration = getDuration(
      data.fundraise.startOfFundraise,
      data.fundraise.endOfFundraise
    )
  } else if (campaignType === 'volunteer') {
    duration = getDuration(
      data.volunteer.commitementStartDate,
      data.volunteer.commitementEndDate
    )
  }

  return {
    _id,
    title,
    story,
    category,
    duration,
    status: campaignStatus,
    views: campaignViews,
    donors: allDonors,
    volunteers: allVolunteers,
    fundingGoal,
    fundsGotten,
    percentage,
    campaignType,
  }
}
