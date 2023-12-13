import { useFormContext } from "react-hook-form"
import TextInput from "../../dashboard-components/TextInput"
import InputTitle from "../../dashboard-components/InputTitle"
import { Button } from "../../dashboard-components/Button"
import PasswordFormContext, { FormFields } from "../utils/usePasswordForm"

const PasswordForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as PasswordFormContext

  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-[824px]">
      <div className="flex flex-col gap-5 mb-[263px] md:mb-[52px]">
        <div className="flex flex-col md:flex-row justify-between gap-y-[9px] gap-x-[25px]">
          <InputTitle
            title="Current password"
            styles={{ wrapper: "md:w-[280px]" }}
          />
          <TextInput
            name="currentPassword"
            rules={{
              required: "Current password is required",
            }}
            ariaLabel="Current password"
            styles={{ wrapper: "grow" }}
          />
        </div>

        <hr />

        <div className="flex flex-col md:flex-row justify-between gap-y-[9px] gap-x-[25px]">
          <InputTitle
            title="New password"
            styles={{ wrapper: "md:w-[280px]" }}
          />
          <TextInput
            name="newPassword"
            rules={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Your new password must be more than 8 characters.",
              },
            }}
            ariaLabel="New password"
            styles={{ wrapper: "grow" }}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-y-[9px] gap-x-[25px]">
          <InputTitle
            title="Confirm new password"
            styles={{ wrapper: "md:w-[280px]" }}
          />
          <TextInput
            name="confirmPassword"
            rules={{
              required: "Confirm password is required",
              validate: {
                value: (confirmPassword, { newPassword }) =>
                  confirmPassword === newPassword || "Passwords do not match",
              },
            }}
            ariaLabel="Confirm new password"
            styles={{ wrapper: "grow" }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-end gap-3">
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
  )
}

export default PasswordForm
