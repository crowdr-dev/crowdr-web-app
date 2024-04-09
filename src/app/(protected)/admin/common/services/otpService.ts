import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"

async function generateOtp(authToken: string) {
  const endpoint = "/api/v1/admin/otp"
  const headers = {
    "x-auth-token": authToken,
  }

  try {
    const { data } = await makeRequest<IPostOtpResponse>(endpoint, {
      headers,
      method: "POST",
    })
    
    return data
  } catch (error) {
    const message = extractErrorMessage(error)
    throw new Error(message)
  }
}

export default {generateOtp}

export interface IPostOtpResponse {
  email: string;
}
