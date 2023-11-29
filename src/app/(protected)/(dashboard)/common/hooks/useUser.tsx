import { createContext, useContext, useEffect, useState } from "react"
import { RFC } from "@/app/common/types"
import { IUser, getUser } from "@/app/api/user/getUser"

const UserContext = createContext<IUser | null>(null)

const UserProvider: RFC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    getUser().then((user) => setUser(user))
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