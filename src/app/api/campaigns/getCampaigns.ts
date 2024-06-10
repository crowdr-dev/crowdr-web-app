import makeRequest from "@/utils/makeRequest";
import { cookies } from "next/headers";
import { campaignsTag } from "@/tags";
import { getUser } from "../user/getUser";

export type CampaignsResponse = {
  campaigns: Campaign[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type CampaignImage = {
  _id: string;
  url: string;
  public_id: string;
  id: string;
};

export type DonatedAmount = {
  currency: string;
  amount: number;
};

export type CampaignDonors = {
  _id: string;
  amount: string;
  campaignDonorId: string;
  campaignId: string;
  campaignOwnerId: string;
  currency: string;
  fullName: string;
  isAnonymous: boolean;
  isSubscribedToPromo: boolean;
  shouldShareDetails: boolean;
  transactionRef: string;
};

export type Campaign = {
  _id: string;
  category: string;
  title: string;
  story: string;
  campaignType: string;
  campaignStatus: string;
  campaignCoverImage: CampaignImage;
  campaignAdditionalImages: CampaignImage[];
  campaignStartDate: string;
  campaignEndDate: string;
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
  campaignDonors: CampaignDonors[];
  volunteer: {
    skillsNeeded: string[];
    otherSkillsNeeded: string;
    ageRange: string;
    genderPreference: string;
    commitementStartDate: string;
    commitementEndDate: string;
    requiredCommitment: string;
    additonalNotes: string;
  };
  totalAmountDonated: DonatedAmount[];
  photo: {
    url: string;
    _id: string;
  };
  user: {
    _id: string;
    interests: string[];
    organizationId: string;
    organizationName: string;
    userType: string;
    fullName: string;
  };
};

export const getCampaigns = async (page?: number, noAuth?: boolean) => {
  let headers: Record<string, string> = {};
  const user = await getUser();

  if (user && !noAuth) {
    headers["x-auth-token"] = user.token;
  }

  const endpoint = `/api/v1/campaigns?page=${page}&perPage=10`;

  const { data: campaigns } = await makeRequest<CampaignsResponse>(endpoint, {
    headers,
    tags: [campaignsTag]
  });

  return campaigns;
};

export const getSingleCampaign = async (id: string, noAuth?: boolean) => {
  let headers: Record<string, string> = {};
  const user = await getUser();

  if (user && !noAuth) {
    headers["x-auth-token"] = user.token;
  }

  const endpoint = `/api/v1/campaigns/${id}`;

  const { data: campaign } = await makeRequest<{ data: Campaign }>(endpoint, {
    headers,
    tags: [campaignsTag]
  });
  return campaign;
};
