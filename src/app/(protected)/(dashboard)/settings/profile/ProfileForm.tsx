import { useFormContext } from "react-hook-form"
import { useUser } from "../../common/hooks/useUser"
import { useToast } from "@/app/common/hooks/useToast"
import { Button } from "../../dashboard-components/Button"
import TextInput from "../../dashboard-components/TextInput"
import makeRequest from "@/utils/makeRequest"

import ProfileFormContext, { FormFields } from "../utils/useProfileForm"
import { useEffect } from "react"

const ProfileForm = () => {
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as ProfileFormContext
  const user = useUser()
  const toast = useToast()
  const isIndividual = user?.userType === "individual"

  useEffect(() => {
    if (user) {
      const { fullName, organizationName, email } = user
      const fields = isIndividual
        ? { fullName, email }
        : { organizationName, email }
      reset(fields)
    }
  }, [user])

  const submit = async (formFields: FormFields) => {
    if (user) {
      const { userType } = user
      const { fullName, organizationName } = formFields

      const endpoint = "/api/v1/settings/edit-profile"
      const headers = {
        "x-auth-token": user.token,
      }

      const payload = isIndividual
        ? { userType, fullName }
        : { userType, organizationName }

      try {
        const { success, message } = await makeRequest(endpoint, {
          headers,
          method: "PATCH",
          payload: JSON.stringify(payload),
        })

        if (success) {
          toast({ title: "Well done!", body: message })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="max-w-[484px]">
      {user && (
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col mb-[33px] md:mb-[38px]">
            {isIndividual ? (
              <TextInput
                name="fullName"
                label="Full name"
                styles={{ wrapper: "mb-[26px]" }}
              />
            ) : (
              <TextInput
                name="organizationName"
                label="Organization name"
                styles={{ wrapper: "mb-[26px]" }}
              />
            )}

            <TextInput
              name="email"
              label="Email address"
              styles={{ wrapper: "mb-[26px]" }}
              disabled
            />
          </div>

          <div className="flex md:justify-end gap-3">
            <Button
              href="/explore"
              text="Cancel"
              textColor="#344054"
              bgColor="white"
              outlineColor="#D0D5DD"
              className="grow md:grow-0 !justify-center"
            />
            <Button
              text="Save changes"
              buttonType="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="grow md:grow-0 !justify-center"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default ProfileForm
