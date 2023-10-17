import makeRequest from "@/utils/makeRequest";
import { cookies } from "next/headers";
import { campaignsTag } from "@/tags";

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

export const getCampaigns = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return null;
  }

  const endpoint = `/api/v1/campaigns`;
  const headers = {
    "x-auth-token": token
  };

  const { data: campaigns } = await makeRequest<{ data: Campaign }>(endpoint, {
    headers,
    cache: "force-cache"
  });
  return campaigns;
};
