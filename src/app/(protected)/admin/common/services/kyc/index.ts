import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"

import { IGetKyc, IKyc, IPatchKyc } from "./models"

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