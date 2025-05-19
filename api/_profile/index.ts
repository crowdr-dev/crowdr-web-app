import api from ".."
import { IDeleteMediaPath } from "./models/DeleteMedia"
import { IGetProfilePath, IGetProfileResponse } from "./models/GetProfile"
import { IPatchUpdateProfileBody } from "./models/PatchUpdateProfile"

const getProfile = async ({ userId }: IGetProfilePath) => {
  const url = `/api/v1/profile/${userId}`

  try {
    const { data } = await api.get<IGetProfileResponse>(url)
    return data.data
  } catch (error) {
    throw error
  }
}

const updateProfile = async (body: IPatchUpdateProfileBody) => {
  const url = `/api/v1/profile`

  try {
    const { data } = await api.patch(url, body)
    return data
  } catch (error) {
    throw error
  }
}

const deleteMedia = async ({ mediaId, column }: IDeleteMediaPath) => {
  const url = `/api/v1/profile/media/${mediaId}/${column}`

  try {
    const { data } = await api.delete(url)
    return data
  } catch (error) {
    throw error
  }
}

export default { getProfile, updateProfile, deleteMedia }
