import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"

import { KycStatus } from "@/app/common/types/Kyc"

async function fetchKyc({ kycId, authToken }: IGetKyc) {
  const endpoint = `/api/v1/admin/kyc/${kycId}`
  const headers = {
    "x-auth-token": authToken,
  }

  try {
    const { data } = await makeRequest<IKyc>(endpoint, {
      headers,
      method: "GET",
    })

    return data
  } catch (error) {
    const message = extractErrorMessage(error)
    throw new Error(message)
  }
}

async function changeKycStatus({
  kycId,
  adminOtp,
  authToken,
  verificationStatus,
  remark,
}: IPatchKyc) {
  const endpoint = `/api/v1/admin/kyc/${kycId}`
  const headers = {
    "x-admin-otp": adminOtp,
    "x-auth-token": authToken,
  }

  const body = {
    verificationStatus,
    ...(remark ? { remark } : {}),
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

const refreshKyc = () => {}

export default { fetchKyc, changeKycStatus, refreshKyc }

export interface IGetKyc {
  kycId: string
  authToken: string
}

export interface IPatchKyc {
  kycId: string
  adminOtp: string
  authToken: string
  verificationStatus: KycStatus
  remark?: string
}

export interface IKyc {
  kyc: Kyc;
  org: Org;
}

export interface Kyc {
  _id:                string;
  userId:             string;
  BVN:                string;
  docType:            string;
  docImg:             DocImg;
  selfieImg:          DocImg;
  verificationStatus: string;
  createdAt:          string;
  updatedAt:          string;
  __v:                number;
  user:               User;
  id:                 string;
}

export interface DocImg {
  _id: string;
  url: string;
  id:  string;
}

export interface User {
  _id:              string;
  userType:         string;
  email:            string;
  interests:        string[];
  referrer:         string;
  isAdmin:          boolean;
  isEmailVerified:  boolean;
  isDeleted:        boolean;
  organizationName: string;
  organizationId:   string;
}

export interface Org {
  _id:       string;
  imageId:   DocImg;
  cacNumber: string;
  state:     string;
  publicUrl: string;
  userId:    string;
  __v:       number;
}

