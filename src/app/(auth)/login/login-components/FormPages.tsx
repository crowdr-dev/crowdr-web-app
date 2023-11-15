import { useRouter } from "next/navigation"
import { useFormContext } from "react-hook-form"
import _ from "lodash"
import LoginFormContext, { FormFields } from "@/app/common/hooks/useLoginForm"
import SignIn from "./SignIn"
import setUserCookie from "@/app/api/user/setUser"
import { useToast } from "@/app/common/hooks/useToast"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { handleUserRedirection } from "@/utils/handleUserRedirection"
import makeRequest from "@/utils/makeRequest"
import { User } from "@/app/api/user/getUser"

const FormPages = () => {
  const { handleSubmit } = useFormContext() as LoginFormContext
  const router = useRouter()
  const toast = useToast()

  const submit = async (formFields: FormFields) => {
    const endpoint = "/api/v1/users/signin"
    let payload = JSON.stringify(_.pick(formFields, ["email", "password"]))

    try {
      const { data: user } = await makeRequest<{ data: User }>(endpoint, {
        method: "POST",
        payload,
      })

      const { token } = user
      if (token) await setUserCookie(token)
      handleUserRedirection(user, router.push)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast({ title: "Oops!", body: message, type: "error" })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <SignIn />
      </form>
    </>
  )
}

export default FormPages
