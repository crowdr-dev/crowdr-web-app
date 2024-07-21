import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"
import { IBankingDetails, IGetBankingDetails, IGetWithdrawal, IPatchWithdrawal, IWithdrawal } from "./models"


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
  remark,
}: IPatchWithdrawal) {
  const endpoint = `/api/v1/admin/withdrawals/${kycId}`
  const headers = {
    "x-admin-otp": adminOtp,
    "x-auth-token": authToken,
  }

  const body = {
    status,
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

async function fetchBankDetails({ userId, authToken }: IGetBankingDetails) {
  const endpoint = `/api/v1/admin/bank-details/user/${userId}`
  const headers = {
    "x-auth-token": authToken,
  }

  try {
    const { data } = await makeRequest<IBankingDetails[]>(endpoint, {
      headers,
      method: "GET",
    })

    return data
  } catch (error) {
    const message = extractErrorMessage(error)
    throw new Error(message)
  }
}

const refreshWithdrawal = () => {}

export default { fetchWithdrawal, changeWithdrawalStatus, fetchBankDetails, refreshWithdrawal }