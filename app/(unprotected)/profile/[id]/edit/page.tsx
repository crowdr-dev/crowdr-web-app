"use client"
import { useParams } from "next/navigation"
import Provider from "./_components/Provider"
import { useQuery } from "react-query"
import query from "../../../../../api/query"
import _profile from "../../../../../api/_profile"
import ProfileDetails from "./_components/ProfileDetails"

const EditProfile = () => {
  const { id: userId } = useParams() as { id: string }

  return (
    <Provider userId={userId}>
      <ProfileDetails />
    </Provider>
  )
}

export default EditProfile
