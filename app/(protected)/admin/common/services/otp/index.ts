import makeRequest from "../../../../../../utils/makeRequest";
import { extractErrorMessage } from "../../../../../../utils/extractErrorMessage";
import { IPostOtpResponse } from "./models";

async function generateOtp(authToken: string) {
  const endpoint = "/admin/otp";
  const headers = {
    "x-auth-token": authToken
  };

  try {
    const { data } = await makeRequest<IPostOtpResponse>(endpoint, {
      headers,
      method: "POST"
    });

    return data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
}

export default { generateOtp };
