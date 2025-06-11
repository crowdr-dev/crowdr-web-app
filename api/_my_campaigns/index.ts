import api from ".."
import { IDeleteCampaignPath } from "./models/DeleteCampaign"
import {
  IGetCampaignSummaryParams,
  IGetCampaignSummaryResponse,
} from "./models/GetCampaignSummary"
import { IPatchEndCampaignPath } from "./models/PatchEndCampaign"

const deleteCampaign = async ({ id }: IDeleteCampaignPath) => {
  const url = `/api/v1/my-campaigns/${id}`

  try {
    const { data } = await api.delete(url)
    return data
  } catch (error) {
    throw error
  }
}

const endCampaign = async ({ id }: IPatchEndCampaignPath) => {
  const url = `/api/v1/my-campaigns/end/${id}`

  try {
    const { data } = await api.patch(url)
    return data
  } catch (error) {
    throw error
  }
}

const getCampaignSummary = async (params: IGetCampaignSummaryParams) => {
  const url = `/api/v1/campaigns/summary`

  try {
    const { data } = await api.get<IGetCampaignSummaryResponse>(url, { params })
    return data.data
  } catch (error) {
    throw error
  }
}

export default { deleteCampaign, endCampaign, getCampaignSummary }
