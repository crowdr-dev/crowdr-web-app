"use client"
import OrganizationFormContext from "../utils/useOrganizationForm"
import OrganizationForm from "./OrganizationForm"

const OrganizationPage = () => {
  return (
    <OrganizationFormContext>
      <OrganizationForm />
    </OrganizationFormContext>
  )
}

export default OrganizationPage
