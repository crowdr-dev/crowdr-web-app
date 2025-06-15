import makeRequest from "@/utils/makeRequest";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { Kyc } from "@/app/(protected)/(dashboard)/settings/verification/VerificationForm";

const getKyc = async ({ userToken }: { userToken: string }) => {
  const endpoint = `/settings/KYC`;
  const headers = {
    "x-auth-token": userToken
  };

  try {
    const { data } = await makeRequest<Kyc>(endpoint, {
      headers,
      method: "GET"
    });

    return data;
  } catch (error) {
    const message = extractErrorMessage(error);
    throw new Error(message);
  }
};

export default { getKyc };
