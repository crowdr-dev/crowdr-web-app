import { useForm, FormProvider } from "react-hook-form"
import { UseFormReturn } from "react-hook-form/dist/types"

import { RFC } from "@/app/common/types"

const VerificationFormContext: RFC = ({ children }) => {
  const formContext: VerificationFormContext = {
    ...useForm<FormFields>(config),
  }

  return <FormProvider {...formContext}>{children}</FormProvider>
}

export default VerificationFormContext
export type { VerificationFormContext, FormFields }

const config: UseFormConfig = {
  defaultValues: {},
  mode: "onChange",
}

type UseFormConfig = Parameters<typeof useForm<FormFields>>[0]
type FormFields = {
  bvnNumber: number
  verficationType: string
  verificationDocument: File
  selfie: File
}
type VerificationFormContext = UseFormReturn<FormFields>