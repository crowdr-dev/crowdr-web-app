"use client";

import { Campaign, getCampaigns } from "@/app/api/campaigns/getCampaigns";
import ExploreCard from "../../(protected)/(dashboard)/dashboard-components/ExploreCard";
import { useState, useEffect } from "react";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import OldModal from "@/app/common/components/OldModal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";
import Head from "next/head";
import NavBar from "./components/NavBar";
import Loading from "@/app/loading";
import { Mixpanel } from "@/utils/mixpanel";

export default function DynamicExplore() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(1);

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

  if (isLoading) return <Loading />;
  return (
    <div className="font-satoshi">
      <Head>
        <title>Explore campaigns</title>
        <meta
          name="description"
          content={"Explore campaigns and spread love by donating."}
        />
        <meta property="og:title" content={"Explore campaigns"} />
        <meta
          property="og:description"
          content="Explore campaigns and spread love by donating."
        />
      </Head>
      <NavBar />
      <div
        className={`py-10 px-6 md:px-40 relative  ${
          campaigns?.length < 1 ? "h-screen" : "h-full"
        }`}>
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[18px] md:text-[24px] font-normal text-[#000]">
            Explore
          </h2>
          <p className="text-[14px] font-normal">
            Explore campaigns and spread love by donating.{" "}
          </p>
        </div>
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
                See more
              </span>
            </div>
          )}
          {campaigns?.length < 1 && !isLoading && (
            <p className="absolute inset-0 flex justify-center items-center text-center font-semibold text-[18px] md:text-[30px] ">
              No campaigns available at this moment.
            </p>
          )}
        </div>
      </div>

      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  );
}
