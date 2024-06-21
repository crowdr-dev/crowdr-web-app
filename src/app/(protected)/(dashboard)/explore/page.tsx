"use client";
import { useQuery } from "react-query";
import { useUser } from "../common/hooks/useUser";
import Filter from "../dashboard-components/Filter";
import ExploreCard from "../dashboard-components/ExploreCard";
import DynamicExplore from "../dashboard-components/DynamicExplore";
import makeRequest from "@/utils/makeRequest";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { isFundraise, isVolunteer } from "../common/utils/campaign";
import { keys } from "../utils/queryKeys";
import { campaignsTag } from "@/tags";

import { Nullable, QF } from "@/app/common/types";
import { ICampaignResponse } from "@/app/common/types/Campaign";
import { useEffect, useState } from "react";
import { Mixpanel } from "@/utils/mixpanel";
import { Campaign, getCampaigns } from "@/app/api/campaigns/getCampaigns";

const Explore = () => {
  const user = useUser();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasNextPage, setHasNextPage] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loadCampaigns = async () => {
    try {
      const newCampaigns = await getCampaigns(page, true);
      setHasNextPage(newCampaigns?.pagination.hasNextPage);

      const campaignsArray = newCampaigns?.campaigns as Campaign[];

      if (Array.isArray(campaignsArray) && campaignsArray.length > 0) {
        setCampaigns((prevCampaigns) => {
          const existingCampaignIds = new Set(
            prevCampaigns.map((campaign) => campaign._id)
          );
          const filteredNewCampaigns = campaignsArray.filter(
            (campaign) => !existingCampaignIds.has(campaign._id)
          );
          return [...prevCampaigns, ...filteredNewCampaigns];
        });
      } else {
        console.error(
          "Received data is not an array of campaigns or it's empty"
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    loadCampaigns();
    Mixpanel.track("Explore Page viewed");
  }, []);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
    loadCampaigns();
  };


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
          {Array.isArray(campaigns) &&
            campaigns?.map((campaign: Campaign, index: number) => {
              const urlsOnly = campaign.campaignAdditionalImages.map(
                (item) => item.url
              );

              const userDetails = campaign?.user;
              const donatedAmount = campaign?.totalAmountDonated?.[0].amount;
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
                  totalAmount={campaign.fundraise?.fundingGoalDetails[0].amount}
                  currency={campaign.fundraise?.fundingGoalDetails[0].currency}
                  currentAmount={donatedAmount}
                  timePosted={campaign?.campaignEndDate}
                  volunteer={campaign?.volunteer}
                  slideImages={[
                    campaign?.campaignCoverImage?.url,
                    ...(urlsOnly || [])
                  ]}
                  donateImage={
                    ""
                  }
                  routeTo={`/explore-campaigns/donate-or-volunteer/${campaign._id}`}
                  avatar={campaign?.photo?.url || ""}
                  key={index}
                  campaignType={campaign.campaignType}
                />
              );
            })}
            {hasNextPage && (
            <div className="flex justify-end items-center mt-4">
              <span onClick={handleSeeMore} className={"cursor-pointer"}>
              {loadingMore ? "...." : "See more"}
              </span>
            </div>
          )}
          {campaigns?.length < 1 && !isLoading && (
            <p className="absolute inset-0 flex justify-center items-center text-center font-semibold text-[18px] md:text-[30px] ">
              No campaigns available at this moment.
            </p>
          )}
          </div>
          {/* <DynamicExplore hasNextPage={campaigns.pagination.hasNextPage} /> */}
        </>
      )}
    </div>
  );
};

export default Explore;

type Data = ICampaignResponse | undefined;
type Token = string | undefined;
type Page = number;
const fetchCampaigns: QF<Data, [Token, Page]> = async ({ queryKey }) => {
  const [_, token, page] = queryKey;

  if (token) {
    const endpoint = `/api/v1/campaigns?page=${page}&perPage=10`;
    const headers = {
      "x-auth-token": token
    };

    try {
      const { data } = await makeRequest<ICampaignResponse>(endpoint, {
        headers,
        tags: [campaignsTag]
      });

      return data;
    } catch (error) {
      const message = extractErrorMessage(error);
      throw new Error(message);
    }
  }
};
