import { getUser } from "@/app/api/user/getUser"
import { RFC } from "@/app/common/types/Component"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext<IUser | null>({
  token: "",
  organizationId: "",
  _id: "",
  fullName: "",
  gender: "",
  email: "",
  userType: "",
  interests: [],
  isEmailVerified: false,
  organizationName: "",
})

const UserProvider: RFC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  
  useEffect(() => {
    getUser().then((res) => setUser(res as IUser))
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

interface IUser {
  token: string
  organizationId: string
  _id: string
  fullName: string
  gender: string
  email: string
  userType: string
  interests: string[]
  isEmailVerified: boolean
  organizationName: string
}