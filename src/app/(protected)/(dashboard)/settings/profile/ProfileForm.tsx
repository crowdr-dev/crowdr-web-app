import { useFormContext } from "react-hook-form"
import TextInput from "../../dashboard-components/TextInput"
import SelectInput from "../../dashboard-components/SelectInput"
import FileInput from "../../dashboard-components/FileInput"
import { Button } from "../../dashboard-components/Button"

import ProfileFormContext, { FormFields } from "../utils/useProfileForm"
import { Option, stateOptions } from "../../common/utils/form"

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as ProfileFormContext

  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <div className="max-w-[484px]">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col mb-[33px] md:mb-[38px]">
          <TextInput
            name="fullName"
            label="Full name"
            styles={{ wrapper: "mb-[26px]" }}
          />
          <TextInput
            name="email"
            label="Email address"
            styles={{ wrapper: "mb-[26px]" }}
          />
          <TextInput
            name="cacNumber"
            label="CAC number"
            styles={{ wrapper: "mb-[33px]" }}
          />
          <FileInput name="profileImage" styles={{ wrapper: "mb-[20px]" }} />
          <SelectInput
            options={[Option('', 'Select a state...', true), ...stateOptions]}
            name="organizationLocation"
            label="Where is your organization located?"
            styles={{ wrapper: "mb-[26px]" }}
          />
          <div className="flex flex-col">
            <label
              htmlFor="public_url"
              className="text-[14px] text-[#344054] mb-[6px]"
            >
              Edit your public URL
            </label>
            <div className="grid grid-cols-[146px_minmax(0,_1fr)]">
              <input
                placeholder="app.crowdr.com/"
                disabled
                className="placeholder:text-[#667085] bg-white rounded-tl-lg rounded-bl-lg border border-[#D0D5DD] border-r-0 py-[10px] pl-[14px]"
              />
              <input
                type="text"
                {...register("publicUrl")}
                id="public_url"
                className="text-[15px] rounded-tr-lg rounded-br-lg border border-[#D0D5DD] py-[10px] px-[14px]"
              />
            </div>
          </div>
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
    </div>
  )
}

export default ProfileForm
