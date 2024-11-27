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
import { useCallback, useEffect, useState } from "react"
import { Mixpanel } from "@/utils/mixpanel"
import { Campaign, getCampaigns } from "@/app/api/campaigns/getCampaigns"
import TextInput from "@/app/common/components/TextInput"

import SearchIcon from "../../../../../public/svg/search.svg"
import { useDebounceCallback } from "usehooks-ts"
import { debounce } from "lodash"
import { Search } from "lucide-react";


const Explore = () => {
  const user = useUser()

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const [hasNextPage, setHasNextPage] = useState<any>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchText, setSearchText] = useState("")

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const loadCampaigns = async ( search: string = "") => {
    try {
      const newCampaigns = await getCampaigns({
        page,
        noAuth: true,
        title: searchText,
      })
      setHasNextPage(newCampaigns?.pagination.hasNextPage)

      const campaignsArray = newCampaigns?.campaigns as Campaign[]

      if (Array.isArray(campaignsArray) && campaignsArray.length > 0) {
        setCampaigns((prevCampaigns) => {
          const existingCampaignIds = new Set(
            prevCampaigns.map((campaign) => campaign._id)
          )
          const filteredNewCampaigns = campaignsArray.filter(
            (campaign) => !existingCampaignIds.has(campaign._id)
          )
          return [...prevCampaigns, ...filteredNewCampaigns]
        })
      } else {
        console.error(
          "Received data is not an array of campaigns or it's empty"
        )
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching campaigns:", error)
    }
  }

   // Debounced search function
   const debouncedSearch = useCallback(
    debounce((search: string) => {
      setPage(1);
      loadCampaigns( search);
    }, 500),
    []
  );

   // Handle search input change
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    loadCampaigns()
    Mixpanel.track("Explore Page viewed")
  }, [])

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1)
    loadCampaigns()
  }

  const setSearch = useDebounceCallback(() => {
    setPage(1)
    loadCampaigns()
  }, 3000)

  return (
    <div className="relative">
      {user && (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-4">
          <div>
            <h3 className="text-2xl text-black">
              Welcome to Crowdr, {user.organizationName} 💚
            </h3>
            <p className="text-sm text-[#61656B]">
              Explore campaigns and spread love by donating.{" "}
            </p>
          </div>

          <div className="grow max-w-[515px] flex gap-3 items-center self-end ">
            <TextInput
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                setSearch()
              }}
              placeholder="Search"
              iconUrl={SearchIcon}
              styles={{
                input: "text-base",
                wrapper: "grow",
              }}
            />

            {/* <Filter query="Trending" /> */}
          </div>
        </div>
      )}

       {/* Search Input */}
       <div className="relative w-full md:w-[400px] mt-2">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search campaigns..."
              className="w-full text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] pl-[40px] pr-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <Search className="absolute left-[14px] top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

      {campaigns && (
        <>
          <div className="grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2">
            {Array.isArray(campaigns) &&
              campaigns?.map((campaign: Campaign, index: number) => {
                const urlsOnly = campaign.campaignAdditionalImages.map(
                  (item) => item.url
                )

                const userDetails = campaign?.user
                const donatedAmount = campaign?.totalAmountDonated?.[0].amount
                return (
                  <ExploreCard
                    id={campaign._id}
                    name={
                      userDetails?.userType === "individual"
                        ? userDetails?.fullName
                        : userDetails?.organizationName
                    }
                    tier={userDetails?.userType}
                    header={campaign?.title}
                    subheader={campaign?.story}
                    category={campaign?.category}
                    totalAmount={
                      campaign.fundraise?.fundingGoalDetails[0].amount
                    }
                    currency={
                      campaign.fundraise?.fundingGoalDetails[0].currency
                    }
                    currentAmount={donatedAmount}
                    timePosted={campaign?.campaignEndDate}
                    volunteer={campaign?.volunteer}
                    slideImages={[
                      campaign?.campaignCoverImage?.url,
                      ...(urlsOnly || []),
                    ]}
                    donateImage={""}
                    routeTo={`/explore-campaigns/donate-or-volunteer/${campaign._id}`}
                    avatar={campaign?.photo?.url || ""}
                    key={index}
                    campaignType={campaign.campaignType}
                  />
                )
              })}
            {hasNextPage && (
              <div className="flex justify-end items-center mt-4">
                <span onClick={handleSeeMore} className={"cursor-pointer"}>
                  {loadingMore ? "...." : "See more"}
                </span>
              </div>
            )}
            {campaigns?.length < 1 && !isLoading && (
              <p className="absolute inset-0 flex justify-center items-center text-center font-semibold text-[18px] md:text-[30px] top-64">
                No campaigns available at this moment.
              </p>
            )}
          </div>
          {/* <DynamicExplore hasNextPage={campaigns.pagination.hasNextPage} /> */}
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
