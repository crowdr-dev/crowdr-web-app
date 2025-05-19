// payload
export interface IGetCampaignSummaryParams {
  userId: string
  startDate?: string
  endDate?: string
}

// response
export interface IGetCampaignSummaryResponse {
  success: boolean;
  message: string;
  data:    IGetCampaignSummaryResponseData;
}

export interface IGetCampaignSummaryResponseData {
  totalNoOfCampaigns:    number;
  totalCampaignViews:    number;
  totalAmountDonated:    TotalAmountDonated[];
  campaignCountByStatus: CampaignCountByStatus;
}

export interface CampaignCountByStatus {
  completed?: number;
  active?:    number;
  pending?:    number;
}

export interface TotalAmountDonated {
  currency:    string;
  totalAmount: number;
}
