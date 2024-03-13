"use client"
import { useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "../common/hooks/useUser"
import ExploreCard from "../dashboard-components/ExploreCard"
import { fetchCampaigns } from "../explore/page"
import { isFundraise, isVolunteer } from "../common/utils/campaign"
import { keys } from "../utils/queryKeys"

import { IFundraiseVolunteerCampaign } from "@/app/common/types/Campaign"

export default function DynamicExplore({
  hasNextPage,
}: {
  hasNextPage?: boolean
}) {
  const [campaigns, setCampaigns] = useState<IFundraiseVolunteerCampaign[]>([])
  const [page, setPage] = useState(2)
  const user = useUser()

  const { data } = useQuery(
    [keys.explore.campaigns, user?.token, page],
    fetchCampaigns,
    {
      enabled: Boolean(user?.token),
      onSuccess: (data) => {
        if (data) {
          const newCampaigns = data.campaigns
          setCampaigns((prevCampaigns) => [...prevCampaigns, ...newCampaigns])
        }
      },
    }
  )

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1)
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2 ">
        {Array.isArray(campaigns) &&
          campaigns?.map((campaign, index) => {
            const urlsOnly = campaign.campaignAdditionalImages.map(
              (item) => item.url
            )

            const userDetails = campaign?.user
            const donatedAmount = campaign?.totalAmountDonated?.[0].amount
            return (
              <ExploreCard
                name={userDetails?.organizationName}
                tier={userDetails?.userType}
                header={campaign?.title}
                subheader={campaign?.story}
                totalAmount={
                  isFundraise(campaign)
                    ? campaign.fundraise?.fundingGoalDetails[0].amount
                    : undefined
                }
                currentAmount={donatedAmount}
                timePosted={campaign?.campaignStartDate}
                category={campaign?.category}
                volunteer={
                  isVolunteer(campaign) ? campaign?.volunteer : undefined
                }
                slideImages={[
                  campaign?.campaignCoverImage?.url,
                  ...(urlsOnly || []),
                ]}
                donateImage={
                  "https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg"
                }
                routeTo={`/explore/donate-or-volunteer/${campaign._id}`}
                avatar={
                  "https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg"
                }
                key={index}
                campaignType={campaign.campaignType}
              />
            )
          })}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-end items-center mt-4">
          <span onClick={handleSeeMore} className={"cursor-pointer"}>
            See more
          </span>
        </div>
      )}
    </>
  )
}
