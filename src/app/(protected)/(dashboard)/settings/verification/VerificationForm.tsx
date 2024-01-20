import { useFormContext } from "react-hook-form"
import { useUser } from "../../common/hooks/useUser"
import { useToast } from "@/app/common/hooks/useToast"
import TextInput from "../../dashboard-components/TextInput"
import SelectInput from "../../dashboard-components/SelectInput"
import FileInput from "../../dashboard-components/FileInput"
import { FileInputContent } from "../../dashboard-components/FileInput"
import { Button } from "../../dashboard-components/Button"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import objectToFormData from "@/utils/objectToFormData"
import makeRequest from "@/utils/makeRequest"

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
  const toast = useToast()

  const verificationDocument = verificationOptions.find(
    (option) => option.value === watch("docType")
  )?.label

  const submit = async (formFields: FormFields) => {
    if (user) {
      const {
        bvnNumber,
        docType,
        docImg: [doc],
        selfieImg: [selfie],
      } = formFields

      const endpoint = "/api/v1/settings/KYC"
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user.token,
      }

      const payload = {
        BVN: bvnNumber,
        docType,
        docImg: doc,
        selfieImg: selfie,
      }

      try {
        const { success, message } = await makeRequest(endpoint, {
          headers,
          method: "PUT",
          payload: objectToFormData(payload),
        })

        if (success) {
          toast({ title: "Well done!", body: message })
        }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast({ title: "Oops!", body: message, type: "error" })
      }
    }
  }

  return (
    <div className="max-w-[484px]">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col mb-[33px] md:mb-[38px]">
          <TextInput
            name="bvnNumber"
            label="BVN number"
            styles={{ wrapper: "mb-[33px]" }}
            rules={{
              pattern: {
                value: /^\d{11}$/,
                message: "Enter a valid BVN number",
              },
            }}
          />

          <SelectInput
            name="docType"
            label="Verification type"
            options={[
              Option("", "Select a verification type...", true),
              ...verificationOptions,
            ]}
            styles={{ wrapper: "mb-[26px]" }}
          />

          <FileInput
            name="docImg"
            styles={{ wrapper: "mb-[50px]" }}
            disabled={!Boolean(verificationDocument)}
          >
            <FileInputContent
              subtext={verificationDocument || "or drag and drop"}
              showPreview
            />
          </FileInput>

          <div>
            <p className="font-medium text-[#344054] mb-[6px]">
              Upload a photo of yourself
            </p>

            <hr className="mb-5" />

            <FileInput name="selfieImg" styles={{ wrapper: "mb-[20px]" }}>
              <FileInputContent subtext="or drag and drop" showPreview />
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
            loading={isSubmitting}
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
  Option("nin_card", "NIN card"),
]
