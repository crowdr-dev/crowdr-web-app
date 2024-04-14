import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"

import { WithdrawalStatus } from "@/app/common/types/Withdrawal"

async function fetchWithdrawal({ withdrawalId, authToken }: IGetWithdrawal) {
  const endpoint = `/api/v1/admin/withdrawals/${withdrawalId}`
  const headers = {
    "x-auth-token": authToken,
  }

  try {
    const { data } = await makeRequest<IWithdrawal>(endpoint, {
      headers,
      method: "GET",
    })

    return data
  } catch (error) {
    const message = extractErrorMessage(error)
    throw new Error(message)
  }
}

async function changeWithdrawalStatus({
  withdrawalId: kycId,
  adminOtp,
  authToken,
  status,
  reason,
}: IPatchWithdrawal) {
  const endpoint = `/api/v1/admin/withdrawals/${kycId}`
  const headers = {
    "x-admin-otp": adminOtp,
    "x-auth-token": authToken,
  }

  const body = {
    status,
    ...(reason ? { reason } : {}),
  }

  try {
    const { data } = await makeRequest<any>(endpoint, {
      headers,
      method: "PATCH",
      payload: JSON.stringify(body),
    })

    return data
  } catch (error) {
    const message = extractErrorMessage(error)
    throw new Error(message)
  }
}

const refreshWithdrawal = () => {}

export default { fetchWithdrawal, changeWithdrawalStatus, refreshWithdrawal }

export interface IGetWithdrawal {
  withdrawalId: string
  authToken: string
}

export interface IPatchWithdrawal {
  withdrawalId: string
  adminOtp: string
  authToken: string
  status: WithdrawalStatus
  reason?: string
}

export interface IWithdrawal {
  _id: string
  userId: string
  campaignId: string
  status: WithdrawalStatus
  createdAt: string
  updatedAt: string
  user: User
  campaign: Campaign
  totalAmountDonated: TotalAmountDonated[]
}

export interface Campaign {
  _id: string
  userId: string
  category: string
  title: string
  story: string
  campaignType: string
  campaignStatus: string
  campaignCoverImage: string
  campaignAdditionalImages: any[]
  campaignStartDate: string
  campaignEndDate: string
  campaignViews: number
  fundraise: Fundraise
  volunteer: Volunteer
}

export interface Fundraise {
  fundingGoalDetails: TotalAmountDonated[]
}

export interface TotalAmountDonated {
  amount: number
  currency: string
}

export interface Volunteer {
  skillsNeeded: string[]
  ageRange: string
  genderPreference: string
  commitementStartDate: string
  commitementEndDate: string
  requiredCommitment: string
  additonalNotes: string
}

export interface User {
  _id: string
  organizationName: string
  organizationId: string
  userType: string
  email: string
  interests: string[]
  referrer: string
  password: string
  isEmailVerified: boolean
  isDeleted: boolean
  __v: number
  isAdmin: boolean
}