import axios from "axios"
import { IGetCampaigns } from "./models/GetCampaigns"

const getCampaigns = async () => {
  const url = `/admin/campaigns`

  try {
    const res = await axios.get<IGetCampaigns>(url)
    return res.data.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred")
  }
}

export default { getCampaigns }
