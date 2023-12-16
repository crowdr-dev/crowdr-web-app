import { useFormContext } from "react-hook-form"
import { useUser } from "../../common/hooks/useUser"
import NumberInput from "../../dashboard-components/NumberInput"
import SelectInput from "../../dashboard-components/SelectInput"
import FileInput from "../../dashboard-components/FileInput"
import FileInputContent from "../../dashboard-components/FileInputContent"
import { Button } from "../../dashboard-components/Button"

import VerificationFormContext, {
  FormFields,
} from "../utils/useVerificationForm"
import { Option } from "../../common/utils/form"

const VerificationForm = () => {
  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as VerificationFormContext
  const user = useUser()

  const verificationDocument = verificationOptions.find(
    (option) => option.value === watch("verficationType")
  )?.label

  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <div className="max-w-[484px]">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col mb-[33px] md:mb-[38px]">
          <NumberInput
            name="bvnNumber"
            label="BVN number"
            disableGroupSeparators
            styles={{ wrapper: "mb-[33px]" }}
          />

          <SelectInput
            options={[
              Option("", "Select a verification type...", true),
              ...verificationOptions,
            ]}
            name="verficationType"
            label="Verification type"
            styles={{ wrapper: "mb-[26px]" }}
          />

          <FileInput name="selfie" styles={{ wrapper: "mb-[50px]" }}>
            <FileInputContent subtext={verificationDocument} />
          </FileInput>

          <div>
            <p className="font-medium text-[#344054] mb-[6px]">
              Upload a photo of yourself
            </p>

            <hr className="mb-5" />

            <FileInput name="selfie" styles={{ wrapper: "mb-[20px]" }}>
              <FileInputContent subtext="selfie" />
            </FileInput>
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

export default VerificationForm

const verificationOptions = [
  Option("drivers_license", "Driver's license"),
  Option("voters_card", "Voter's card"),
  Option("international_passport", "International passport"),
]
