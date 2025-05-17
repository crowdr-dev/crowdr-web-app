import api from ".."
import { IDeleteMediaPath } from "./models/DeleteMedia"
import { IGetProfileParams } from "./models/GetProfile"
import { IPatchUpdateProfileBody } from "./models/PatchUpdateProfile"

const getProfile = async (params: IGetProfileParams) => {
  const url = `/api/v1/profile`

  try {
    const { data } = await api.get(url, { params })
    return data
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
