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
    allDonors,
  } = data

  const {
    fundingGoalDetails: [fundingGoalDetail],
    startOfFundraise,
    endOfFundraise,
  } = data.fundraise
  
  const duration = getDuration(startOfFundraise, endOfFundraise)
  const fundingGoal = formatAmount(fundingGoalDetail.amount, fundingGoalDetail.currency)
  const fundsGotten = `${fundingGoal[0]}5,000` // temporary
  const percentage = Math.floor((5000/fundingGoalDetail.amount) * 100)

  return {
    _id,
    title,
    story,
    category,
    duration,
    status: campaignStatus,
    views: campaignViews,
    donors: allDonors,
    fundingGoal,
    fundsGotten,
    percentage
  }
}
