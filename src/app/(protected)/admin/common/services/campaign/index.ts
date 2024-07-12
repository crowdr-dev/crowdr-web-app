import axios from "axios"
import { IGetCampaignsParams, IGetCampaignsResponse } from "./models/GetCampaigns"

const getCampaigns = async (params: Partial<IGetCampaignsParams> = {}) => {
  const url = `/admin/campaigns`

  try {
    const res = await axios.get<IGetCampaignsResponse>(url, {params})
    return res.data.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred")
  }
}

export default { getCampaigns }
