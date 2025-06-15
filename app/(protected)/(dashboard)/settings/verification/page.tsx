"use client"
import VerificationFormContext from "../utils/useVerificationForm"
import VerificationForm from "./VerificationForm"

const VerificationPage = () => {
  return (
    <VerificationFormContext>
      <VerificationForm />
    </VerificationFormContext>
  )
}

export default VerificationPage
