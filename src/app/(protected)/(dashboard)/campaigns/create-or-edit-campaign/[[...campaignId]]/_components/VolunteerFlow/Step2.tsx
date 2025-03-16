import InputTitle from "@/app/common/components/InputTitle"
import TextInput from "@/app/common/components/TextInput"
import Link from "next/link"
import { useFormContext } from "react-hook-form"
import { CampaignFormContext } from "../useCampaignForm"
import SelectInput from "@/app/common/components/SelectInput"
import { Option } from "@/app/(protected)/(dashboard)/common/utils/form"
import { campaignCategories } from "@/utils/campaignCategory"
import DateInput from "@/app/common/components/DateInput"
import TextAreaInput from "@/app/common/components/TextAreaInput"
import { WhiteButton, Button } from "@/app/common/components/Button"
import { RFC } from "@/app/common/types"
import OptionInput from "@/app/common/components/OptionInput"

const Step2: RFC<Props> = ({ index, onStep, onDone }) => {
  const { campaignType, setShowPreview, ...form } =
    useFormContext() as CampaignFormContext
  const errors = form.formState.errors

  const nextStep = (callback: () => void) => {
    const title = form.getValues("title")
    const story = form.getValues("story")
    const category = form.getValues("category")
    const campaignDuration = form.getValues("campaignDuration")
    const ageRange = form.getValues("ageRange")
    const genderPreference = form.getValues("genderPreference")
    const timeCommitment = form.getValues("timeCommitment")
    const volunteerCommitment = form.getValues("volunteerCommitment")
    const isInvalid =
      !ageRange ||
      !genderPreference ||
      !timeCommitment ||
      !volunteerCommitment ||
      (campaignType !== "fundraiseAndVolunteer" &&
        (!title || !story || !category || !campaignDuration))

    if (!isInvalid) {
      callback()
    } else {
      form.trigger("ageRange")
      form.trigger("genderPreference")
      form.trigger("timeCommitment")
      form.trigger("volunteerCommitment")

      if (campaignType !== "fundraiseAndVolunteer") {
        form.trigger("title")
        form.trigger("story")
        form.trigger("category")
        form.trigger("campaignDuration")
      }
    }
  }

  return (
    <div className="pt-10 pb-6">
      <div className="max-w-[883px]">
        {campaignType !== "fundraiseAndVolunteer" && (
          <>
            {/* title */}
            <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
              <InputTitle
                title="Title"
                detail="Make sure it's brief and eye-catching!"
              />
              <div className="max-w-lg">
                <TextInput
                  name="title"
                  rules={{
                    required: "Title is required",
                  }}
                  error={errors.title}
                  ariaLabel="Title"
                />
              </div>
            </div>

            {/* campaign description */}
            <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
              <InputTitle
                title="Tell Your Story"
                detail="The more details, the better."
              />
              <div className="max-w-lg">
                <TextAreaInput
                  name="story"
                  rules={{
                    required: "Story is required",
                  }}
                  characterLimit={5000}
                  additionalCharacterInfo="(must be between 60 - 5000 characters)"
                  error={errors.story}
                  ariaLabel="Tell Your Story"
                />
              </div>
            </div>

            {/* category */}
            <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
              <InputTitle
                title="Category"
                detail="Choose a category that best represents your campaign."
              />
              <div className="max-w-lg">
                <SelectInput
                  name="category"
                  options={categories}
                  rules={{
                    required: "Category is required",
                  }}
                  error={errors.category}
                  ariaLabel="Category"
                />
              </div>
            </div>

            {/* choose a campaign duration */}
            <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
              <InputTitle
                title="Choose a Campaign Duration"
                detail="This is how long you want the campaign to run. You can edit this later."
              />

              <div className="max-w-lg">
                <DateInput
                  config={form.register("campaignDuration", {
                    required: "Campaign duration is required",
                  })}
                  error={errors.campaignDuration as any}
                  mode="range"
                  minDate={new Date()}
                  // enableTime
                />
              </div>
            </div>
          </>
        )}

        {/* age needed */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <InputTitle title="Age Range" />

          <div className="max-w-lg">
            {ageRanges.map((ageRange) => (
              <OptionInput
                type="radio"
                key={ageRange.value}
                value={ageRange.value}
                label={ageRange.label}
                name="ageRange"
                rules={{
                  required: "Age needed is required",
                }}
              />
            ))}
            {errors.ageRange && (
              <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                {errors.ageRange?.message}
              </span>
            )}
          </div>
        </div>

        {/* gender preference */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <InputTitle title="Gender Preference" />

          <div className="max-w-lg">
            {genderPreferences.map((genderPreference) => (
              <OptionInput
                type="radio"
                key={genderPreference.value}
                value={genderPreference.value}
                label={genderPreference.label}
                name="genderPreference"
                rules={{
                  required: "Gender preference is required",
                }}
              />
            ))}
            {errors.genderPreference && (
              <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                {errors.genderPreference?.message}
              </span>
            )}
          </div>
        </div>

        {/* date and time needed */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <InputTitle title="Date and Time Needed" />

          <div className="max-w-lg">
            <DateInput
              name="timeCommitment"
              rules={{
                required: "Time commitment is required",
              }}
              error={errors.timeCommitment as any}
              mode="range"
              minDate={new Date()}
              // enableTime
            />
          </div>
        </div>

        {/* volunteer commitment */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <InputTitle title="Volunteer Commitment" />

          <div className="max-w-lg">
            {volunteerCommitment.map((commitment) => (
              <OptionInput
                type="radio"
                key={commitment.value}
                value={commitment.value}
                label={commitment.label}
                name="volunteerCommitment"
                rules={{
                  required: "Volunteer commitment is required",
                }}
              />
            ))}
            {errors.volunteerCommitment && (
              <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                {errors.volunteerCommitment?.message}
              </span>
            )}
          </div>
        </div>

        {/* code of conduct */}
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-14 lg:mb-[25px]">
          <InputTitle
            title="Code of conduct - Volunteer guidelines and Health and Safety Information"
            id="notes"
          />

          <div className="max-w-lg">
            <TextAreaInput
              name="additionalNotes"
              characterLimit={300}
              error={errors.additionalNotes}
              ariaLabelledBy="notes"
            />
          </div>
        </div>

        {/* prev x next */}
        {campaignType !== "fundraiseAndVolunteer" ? (
          <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-end gap-4">
            <WhiteButton
              text="Back"
              shadow
              onClick={() => onStep(index - 1)}
              className="!bg-[#C2C3C6] !text-white justify-center grow lg:max-w-[220px]"
            />

            <Button
              text={"Continue"}
              onClick={() => nextStep(() => onStep(index + 1))}
              className=" justify-center grow lg:max-w-[220px]"
            />
          </div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-end gap-4">
            <WhiteButton
              text="Preview Campaign"
              shadow
              onClick={() => nextStep(() => setShowPreview(true))}
              className="!text-[#00A85B] !border-[#00A85B] hover:!bg-green-50 justify-center grow lg:max-w-[220px]"
            />

            <Button
              text={"Launch Campaign"}
              disabled={form.formState.isSubmitting}
              loading={form.formState.isSubmitting}
              onClick={onDone}
              className="!justify-center grow lg:max-w-[220px]"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Step2

interface Props {
  index: number
  onStep: (step: number) => void
  onDone: () => void
}

const categories = [
  Option("", "Select a category...", true),
  ...campaignCategories,
]

const ageRanges = [
  Option("18 - 25", "18 - 25"),
  Option("26 - 35", "26 - 35"),
  Option("36 - 45", "36 - 45"),
  Option("46 - 55", "46 - 55"),
  Option("56 and above", "56 and above"),
  Option("no preference", "No preference"),
]

const genderPreferences = [
  Option("female", "Female"),
  Option("male", "Male"),
  Option("no preference", "No preference"),
]

const volunteerCommitment = [
  Option("one-time event", "One-time event"),
  Option("weekly commitment", "Weekly commitment"),
  Option("monthly commitment", "Monthly commitment"),
  Option("flexible schedule", "Flexible schedule"),
]
