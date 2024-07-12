export interface IGetCampaigns {
  success: boolean;
  message: string;
  data:    IGetCampaignsData;
}

export interface IGetCampaignsData {
  campaigns:  Campaign[];
  pagination: Pagination;
}

export interface Campaign {
  _id:                         string;
  userId:                      string;
  category:                    string;
  title:                       string;
  story:                       string;
  campaignType:                CampaignType;
  campaignStatus:              CampaignStatus;
  campaignCoverImage:          CampaignCoverImage;
  campaignAdditionalImages:    CampaignCoverImage[];
  campaignStartDate:           Date;
  campaignEndDate:             Date;
  fundraise:                   Fundraise;
  campaignVolunteers:          any[];
  campaignDonors:              CampaignDonor[];
  user:                        User;
  photo?:                      CampaignCoverImage;
  campaignViews:               number;
  totalNoOfCampaignDonors:     number;
  totalNoOfCampaignVolunteers: number;
  totalAmountDonated:          TotalAmountDonated[];
  isCompleted:                 boolean;
}

export interface CampaignCoverImage {
  _id:       string;
  url:       string;
  public_id: string;
  tags:      Tag[];
}

export enum Tag {
  CampaignAdditionalImages = "campaignAdditionalImages",
  CampaignCoverImage = "campaignCoverImage",
}

export interface CampaignDonor {
  _id:                 string;
  amount:              string;
  totalAmount:         string;
  transactionFee:      string;
  currency:            Currency;
  campaignOwnerId:     string;
  campaignId:          string;
  fullName:            string;
  isAnonymous:         boolean;
  shouldShareDetails:  boolean;
  isSubscribedToPromo: boolean;
  transactionRef:      string;
}

export enum Currency {
  Dollar = "dollar",
  Naira = "naira",
}

export enum CampaignStatus {
  InReview = "in-review",
}

export enum CampaignType {
  Fundraise = "fundraise",
}

export interface Fundraise {
  fundingGoalDetails: FundingGoalDetail[];
}

export interface FundingGoalDetail {
  amount:   number;
  currency: Currency;
}

export interface TotalAmountDonated {
  currency:      Currency;
  amount:        number;
  serviceFee:    number;
  payableAmount: number;
}

export interface User {
  _id:               string;
  userType:          UserType;
  interests:         string[];
  isAdmin:           boolean;
  organizationName?: string;
  organizationId?:   string;
  fullName?:         string;
  gender?:           string;
}

export enum UserType {
  Individual = "individual",
  NonProfit = "non-profit",
}

export interface Pagination {
  total:       number;
  perPage:     number;
  currentPage: number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
