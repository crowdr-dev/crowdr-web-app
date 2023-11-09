import makeRequest from "@/utils/makeRequest";
import { cookies } from "next/headers";
import { campaignsTag } from "@/tags";
import { getUser } from "../user/getUser";

export type Campaign = {
  success: boolean;
  message: string;
  data: {
    category: string;
    title: string;
    story: string;
    campaignType: string;
    campaignStatus: string;
    campaignCoverImageUrl: string;
    campaignAdditionalImagesUrl: [string];
    fundraise: {
      fundingGoalDetails: [
        {
          amount: number;
          currency: string;
        }
      ];
      startOfFundraise: string;
      endOfFundraise: string;
    };
    volunteer: {
      skillsNeeded: string;
      otherSkillsNeeded: string;
      ageRange: string;
      genderPreference: string;
      commitementStartDate: string;
      commitementEndDate: string;
      requiredCommitment: string;
      additonalNotes: string;
    };
  };
};

export const getCampaigns = async (page?: number, perPage?: number) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const endpoint = `/api/v1/campaigns`;
  const headers = {
    "x-auth-token": user.token
  };

  const { data: campaigns } = await makeRequest<{ data: Campaign }>(endpoint, {
    headers,
    cache: "force-cache",
    tags: [campaignsTag]
  });
  return campaigns;
};

export const getSingleCampaign = async (id: string) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const endpoint = `/api/v1/campaigns/${id}`;
  const headers = {
    "x-auth-token": user.token
  };

  const { data: campaign } = await makeRequest<{ data: Campaign }>(endpoint, {
    headers,
    cache: "force-cache",
    tags: [campaignsTag]
  });
  return campaign;
};
