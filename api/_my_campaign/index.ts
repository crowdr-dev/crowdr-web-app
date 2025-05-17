import api from ".."
import { IDeleteCampaignPath } from "./models/DeleteCampaign"
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

export default { deleteCampaign, endCampaign }
