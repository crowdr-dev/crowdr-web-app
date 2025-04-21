import api from ".."

const getProfile = async () => {
  const url = `/api/v1/profile`

  try {
    const { data } = await api.get(url)
    return data
  } catch (error) {
    throw error
  }
}

const updateProfile = async () => {
  const url = `/api/v1/profile`

  try {
    const { data } = await api.patch(url)
    return data
  } catch (error) {
    throw error
  }
}

export default { getProfile, updateProfile, }
