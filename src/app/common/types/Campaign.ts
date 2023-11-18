import { CampaignCategory } from "@/utils/campaignCategory";
import { IPagination } from "./Common";

export interface ICampaign {
  _id:                      string;
  userId:                   string;
  category:                 CampaignCategory;
  title:                    string;
  story:                    string;
  campaignType:             CampaignType;
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

export interface CampaignResponse {
  campaigns: ICampaign[]
  pagination: IPagination
}

export type CampaignStatus = "completed" | "in-progress" | "declined" | "in-review"
export type CampaignType = 'fundraise' | 'volunteer' | 'fundraiseAndVolunteer'