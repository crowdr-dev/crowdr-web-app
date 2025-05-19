import api from ".."
import {
  IGetCampaignsParams,
  IGetCampaignsResponse,
} from "./models/GetCampaigns"

const getCampaigns = async (params: IGetCampaignsParams) => {
  const url = `/api/v1/campaigns`

  try {
    const { data } = await api.get<IGetCampaignsResponse>(url, { params })
    return data.data
  } catch (error) {
    throw error
  }
}

export default { getCampaigns }
