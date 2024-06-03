"use client"
import { useQuery } from "react-query"
import { useUser } from "../common/hooks/useUser"
import Filter from "../dashboard-components/Filter"
import ExploreCard from "../dashboard-components/ExploreCard"
import DynamicExplore from "../dashboard-components/DynamicExplore"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { isFundraise, isVolunteer } from "../common/utils/campaign"
import { keys } from "../utils/queryKeys"
import { campaignsTag } from "@/tags"

import { Nullable, QF } from "@/app/common/types"
import { ICampaignResponse } from "@/app/common/types/Campaign"
import { useEffect } from "react"
import { Mixpanel } from "@/utils/mixpanel"

const Explore = () => {
  const user = useUser()
  const page = 1

  const { data: campaigns } = useQuery(
    [keys.explore.campaigns, user?.token, page],
    fetchCampaigns,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false
    }
  )

  useEffect(() => {
    Mixpanel.track("Explore Page viewed")
  }, [])

  return (
    <div>
      {user && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl text-black">
              Welcome to Crowdr, {user.organizationName} 💚
            </h3>
            <p className="text-sm text-[#61656B]">
              Explore campaigns and spread love by donating.{" "}
            </p>
          </div>
          {/* <div>
            <Filter query="Trending" />
          </div> */}
        </div>
      )}

      {campaigns && (
        <>
          <div className="grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2">
            {Array.isArray(campaigns.campaigns) &&
              campaigns.campaigns.map((campaign, index) => {
                const userDetails = campaign?.user
                const donatedAmount = campaign?.totalAmountDonated?.[0].amount
                const urlsOnly = campaign.campaignAdditionalImages.map(
                  (item) => item.url
                )

                return (
                  <ExploreCard
                    name={userDetails.organizationName}
                    tier={userDetails.userType}
                    header={campaign.title}
                    subheader={campaign.story}
                    category={campaign.category}
                    totalAmount={
                      isFundraise(campaign)
                        ? campaign.fundraise.fundingGoalDetails[0].amount
                        : undefined
                    }
                    currentAmount={donatedAmount}
                    timePosted={campaign.campaignStartDate}
                    volunteer={
                      isVolunteer(campaign) ? campaign.volunteer : undefined
                    }
                    slideImages={[
                      campaign.campaignCoverImage.url,
                      ...(urlsOnly || []),
                    ]}
                    donateImage={
                      "https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg"
                    }
                    routeTo={`/explore/donate-or-volunteer/${campaign._id}`}
                    avatar={
                      campaign?.photo?.url || ""
                    }
                    key={index}
                    campaignType={campaign.campaignType}
                  />
                )
              })}
          </div>
          <DynamicExplore hasNextPage={campaigns.pagination.hasNextPage} />
        </>
      )}
    </div>
  )
}

export default Explore

type Data = ICampaignResponse | undefined
type Token = string | undefined
type Page = number
const fetchCampaigns: QF<Data, [Token, Page]> = async ({ queryKey }) => {
  const [_, token, page] = queryKey

  if (token) {
    const endpoint = `/api/v1/campaigns?page=${page}&perPage=10`
    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<ICampaignResponse>(endpoint, {
        headers,
        tags: [campaignsTag],
      })

      return data
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}