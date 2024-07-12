import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { atom, useAtom } from "jotai"
import { API_BASE_URL } from "@/config"

import { RFC } from "@/app/common/types"
import { IUser, getUser } from "@/app/api/user/getUser"

const UserContext = createContext<IUser | null>(null)
export const userAtom = atom<IUser | null>(null)

const UserProvider: RFC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        axios.defaults.baseURL = `${API_BASE_URL}/api/v1`
        axios.defaults.headers.common["x-auth-token"] = user.token
      }

      setUser(user)
    })
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider

export const useUser = () => {
  return useContext(UserContext)
}

type UserProviderProps = {
  children: React.ReactNode
}