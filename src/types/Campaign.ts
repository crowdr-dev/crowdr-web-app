export interface Campaign {
  _id:                      string;
  userId:                   string;
  category:                 string;
  title:                    string;
  story:                    string;
  campaignType:             string;
  campaignStatus:           CampaignStatus;
  campaignCoverImage:       CampaignCoverImage;
  campaignAdditionalImages: any[];
  campaignViews:            number;
  fundraise:                Fundraise;
  allDonors:                number;
  allVolunteers:            number;
  __v:                      number;
}

export interface CampaignCoverImage {
  _id:       string;
  url:       string;
  public_id: string;
  id:        string;
}

export interface Fundraise {
  fundingGoalDetails: FundingGoalDetail[];
  startOfFundraise:   string;
  endOfFundraise:     string;
}

export interface FundingGoalDetail {
  amount:   number;
  currency: string;
}

export type CampaignStatus = "completed" | "in-progress" | "declined" | "in-review"