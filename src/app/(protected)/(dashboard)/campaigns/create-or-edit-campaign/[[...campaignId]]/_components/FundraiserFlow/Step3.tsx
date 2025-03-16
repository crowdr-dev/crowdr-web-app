import InputTitle from "@/app/common/components/InputTitle"
import { useFormContext } from "react-hook-form"
import { CampaignFormContext } from "../useCampaignForm"
import { Option } from "@/app/(protected)/(dashboard)/common/utils/form"
import { campaignCategories } from "@/utils/campaignCategory"
import { WhiteButton, Button } from "@/app/common/components/Button"
import { RFC } from "@/app/common/types"
import FileInput from "@/app/common/components/FileInput"
import { twMerge } from "tailwind-merge"

const Step3: RFC<Props> = ({ index, onStep, onDone }) => {
  const { isEdit, campaignType, setShowPreview, ...form } =
    useFormContext() as CampaignFormContext
  const isFundraiser = campaignType === "fundraise"
  const backButtonText = isFundraiser ? "Preview Campaign" : "Back"
  const errors = form.formState.errors
  const saveButtonText = isFundraiser
    ? isEdit
      ? "Save"
      : "Launch campaign"
    : "Continue to Volunteer campaign"

  const nextStep = (callback: () => void) => {
    const campaignImages = form.getValues("campaignImages")
    const isInvalid = !campaignImages

    if (!isInvalid) {
      callback()
    } else {
      form.trigger("campaignImages")
    }
  }

  return (
    <div className="pt-10 pb-6">
      <div className="max-w-[888px]">
        {/* upload engaging media */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-14 lg:mb-[25px]">
          <InputTitle
            title="Upload Engaging Media"
            detail="Did you know that campaigns with high-quality visuals are 2x more likely to receive donations?"
          />

          <div className="max-w-lg">
            <FileInput
              name="campaignImages"
              rules={{
                required: {
                  value: isEdit ? false : true,
                  message: "Campaign image is required",
                },
              }}
              error={errors.campaignImages}
              maxFileSizeInMb={2}
              multiple
              showFileList
            />
          </div>
        </div>

        {/* prev x next */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-end gap-4">
          <WhiteButton
            text={backButtonText}
            shadow
            onClick={() =>
              isFundraiser
                ? nextStep(() => setShowPreview(true))
                : onStep(index - 1)
            }
            className="!bg-[#C2C3C6] !text-white justify-center grow lg:max-w-[220px]"
          />

          <Button
            text={saveButtonText}
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            onClick={() => nextStep(onDone)}
            className={twMerge(
              "justify-center grow lg:max-w-[220px]",
              campaignType === "fundraiseAndVolunteer" && "lg:max-w-[240px]"
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Step3

interface Props {
  index: number
  onStep: (step: number) => void
  onDone: () => void
}

const categories = [
  Option("", "Select a category...", true),
  ...campaignCategories,
]

const tips = [
  "Start with a short introduction of yourself",
  "Why this campaign is important to you and",
  "Your plans for the funds.",
]
