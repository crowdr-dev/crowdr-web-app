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
  status,
  reason,
}: IPatchKyc) {
  const endpoint = `/api/v1/admin/kyc/${kycId}`
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
  status: KycStatus
  reason?: string
}

export interface IKyc {
  _id: string
  userId: string
  BVN: string
  docType: string
  docImg: Img
  selfieImg: Img
  verificationStatus: string
  createdAt: string
  updatedAt: string
  __v: number
  reason: string
  status: KycStatus
  user: null
  id: string
}

export interface Img {
  _id: string
  url: string
  id: string
}
