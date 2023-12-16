import { useFormContext } from "react-hook-form"
import { useUser } from "../../common/hooks/useUser"
import TextInput from "../../dashboard-components/TextInput"
import { Button } from "../../dashboard-components/Button"

import ProfileFormContext, { FormFields } from "../utils/useProfileForm"

const ProfileForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as ProfileFormContext
  const user = useUser()

  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <div className="max-w-[484px]">
      {user && (
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col mb-[33px] md:mb-[38px]">
            {user.userType === "individual" ? (
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
              className="grow md:grow-0 !justify-center"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default ProfileForm
