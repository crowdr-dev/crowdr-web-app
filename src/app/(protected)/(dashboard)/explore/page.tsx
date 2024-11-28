"use client";
import { useQuery } from "react-query";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";
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
import { useCallback, useEffect, useState } from "react";
import { Mixpanel } from "@/utils/mixpanel";
import { Campaign, getCampaigns } from "@/app/api/campaigns/getCampaigns";
import Loading from "@/app/loading";

const Explore = () => {
  const user = useUser();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [hasNextPage, setHasNextPage] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const loadCampaigns = async (pageNum: number, search: string = "") => {
    try {
      setLoadingMore(pageNum > 1);
      const newCampaigns = await getCampaigns(pageNum, true, search || "");
      setHasNextPage(newCampaigns?.pagination.hasNextPage || false);

      const campaignsArray = newCampaigns?.campaigns as Campaign[];

      if (Array.isArray(campaignsArray)) {
        setCampaigns((prevCampaigns) => {
          // If it's a new search or first page, replace all campaigns
          if (pageNum === 1) {
            return campaignsArray;
          }

          // For pagination, merge with existing campaigns
          const existingCampaignIds = new Set(
            prevCampaigns.map((campaign) => campaign._id)
          );
          const filteredNewCampaigns = campaignsArray.filter(
            (campaign) => !existingCampaignIds.has(campaign._id)
          );
          return [...prevCampaigns, ...filteredNewCampaigns];
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setPage(1);
      loadCampaigns(1, search);
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    loadCampaigns(1, "");
    Mixpanel.track("Explore Page viewed");
  }, []);

  const handleSeeMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCampaigns(nextPage, searchTerm);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="relative">
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

      {/* Search Input */}
      <div className="relative w-full md:w-[400px] mt-2">
        <input
          type="text"
          value={searchTerm}
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
                      ...(urlsOnly || [])
                    ]}
                    donateImage={""}
                    routeTo={`/explore-campaigns/donate-or-volunteer/${campaign._id}`}
                    avatar={campaign?.photo?.url || ""}
                    key={index}
                    campaignType={campaign.campaignType}
                  />
                );
              })}
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSeeMore}
                  disabled={loadingMore}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 text-[15px]">
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
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
