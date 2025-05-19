// payload
export interface IGetCampaignsParams {
  page?: number
  perPage?: number
  campaignStatus?: CampaignStatus
  runningStatus?: RunningStatus
  title?: string
  type?: CampaignType
  category?: CampaignCategory
  userId?: string
}

export enum CampaignStatus {
  Approved = "approved",
  InReview = "in-review",
  Declined = "declined",
}

export enum RunningStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
}

export enum CampaignType {
  Fundraise = "fundraise",
  Volunteer = "volunteer",
  FundraiseVolunteer = "fundraiseAndVolunteer",
}

export enum CampaignCategory {
  Business = "business",
  Education = "education",
  Arts = "arts",
  Events = "events",
  Family = "family",
  Sports = "sport",
  Tech = "tech",
  Health = "health",
  Music = "music",
  Legal = "legal",
  Politics = "politics",
  Others = "others",
}

// response
export interface IGetCampaignsResponse {
  success: boolean;
  message: string;
  data:    IGetCampaignsResponseData;
}

export interface IGetCampaignsResponseData {
  campaigns:  Campaign[];
  pagination: Pagination;
}

export interface Campaign {
  _id:                         string;
  userId:                      string;
  category:                    string;
  title:                       string;
  story:                       string;
  campaignType:                string;
  campaignStatus:              string;
  campaignCoverImage:          Image;
  campaignAdditionalImages:    Image[];
  campaignStartDate:           string;
  campaignEndDate:             string;
  volunteer?:                  Volunteer;
  campaignVolunteers:          CampaignVolunteer[];
  campaignDonors:              any[];
  user:                        User;
  campaignViews:               number;
  totalNoOfCampaignDonors:     number;
  totalNoOfCampaignVolunteers: number;
  totalAmountDonated:          TotalAmountDonated[];
  isCompleted:                 boolean;
  sortAmount:                  number;
  fundraise?:                  Fundraise;
  tipsEmailSent?:              boolean;
  deletedAt?:                  null;
  photo?:                      Image;
}

export interface Image {
  _id:       string;
  url:       string;
  public_id: string;
  tags:      string[];
}

export interface CampaignVolunteer {
  _id:         string;
  campaignId:  string;
  fullName:    string;
  email:       string;
  status:      string;
  gender:      string;
  ageRange:    string;
  address:     string;
  about:       string;
  userId:      string;
  phoneNumber: string;
}

export interface Fundraise {
  fundingGoalDetails: FundingGoalDetail[];
}

export interface FundingGoalDetail {
  amount:   number;
  currency: Currency;
}

export enum Currency {
  Dollar = "dollar",
  Naira = "naira",
}

export interface TotalAmountDonated {
  currency:      Currency;
  amount:        number;
  serviceFee:    number;
  payableAmount: number;
}

export interface User {
  _id:               string;
  userType:          string;
  email:             string;
  interests:         string[];
  isAdmin:           boolean;
  fullName?:         string;
  gender?:           string;
  tipsEmailSent?:    boolean;
  organizationName?: string;
  organizationId?:   string;
}

export interface Volunteer {
  skillsNeeded:         string[];
  ageRange:             string;
  genderPreference:     string;
  commitementStartDate: string;
  commitementEndDate:   string;
  requiredCommitment:   string;
  additonalNotes:       string;
  volunteersNeeded?:    number;
  email?:               string;
  phoneNumber?:         string;
  address?:             string;
}

export interface Pagination {
  total:       number;
  perPage:     number;
  currentPage: number;
  totalPages:  number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
