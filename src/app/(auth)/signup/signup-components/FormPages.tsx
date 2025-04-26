import { useFormContext } from "react-hook-form"
import _ from "lodash"
import { useToast } from "@/app/common/hooks/useToast"
import {
  FormFields,
  RegisterFormContext,
} from "@/app/(auth)/signup/utils/useRegisterForm"

import Intro from "./Intro"
import AccountDetails from "./AccountDetails"
import { useRouter } from "next/navigation"
import setUserCookie from "@/app/api/user/setUser"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"
import { IUser } from "@/app/api/user/getUser"
import { Mixpanel } from "@/utils/mixpanel"

const FormPages = () => {
  const { formPage, handleSubmit } = useFormContext() as RegisterFormContext
  const toast = useToast()
  const router = useRouter()

  const submit = async (formFields: FormFields) => {
    const endpoint = "/api/v1/users/signup"
    let payload = JSON.stringify(
      _.pick(formFields, [
        "userType",
        "email",
        "phoneNumber",
        "interests",
        "password",
        "referrer",
        "organizationName",
        "fullName",
        "gender",
      ])
    )

    try {
      const { data: user } = await makeRequest<IUser>(endpoint, {
        method: "POST",
        payload,
      })

      const { token } = user
      if (token) {
        await setUserCookie(token)
      }
      router.push("/confirmation")
    } catch (error: any) {
      const message = extractErrorMessage(error)
      Mixpanel.track("Signup Error")
      toast({ title: "Oops!", body: message, type: "error" })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      {formPage == "intro" && <Intro />}
      {formPage == "account" && <AccountDetails />}
    </form>
  )
}

export default FormPages
