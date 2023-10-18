import { useMemo, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import CampaignFormContext, {
  FormFields,
} from "../campaigns/create-or-edit-campaign/utils/useCreateCampaign";
import { Button, WhiteButton } from "./Button";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import InputTitle from "./InputTitle";
import TextAreaInput from "./TextAreaInput";
import NumberInput from "./NumberInput";
import DateInput from "./DateInput";
import OptionInput from "./OptionInput";
import FileInput from "./FileInput";

import { campaignCategories } from "@/utils/campaignCategory";
import { RFC } from "@/types/Component";

const CampaignForm: RFC<CampaignFormProps> = ({ submit }) => {
  const {
    register,
    control,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext() as CampaignFormContext;
  const [skillsNeeded, campaignType] = useWatch({ control, name: ['skillsNeeded', 'campaignType'] });
  const [fundraiseOpen, setFundraiseOpen] = useState(true);
  const [volunteerOpen, setVolunteerCallOpen] = useState(true);
  const showFundraiseSection = campaignType?.match(/fundraise/i)
  const showVolunteerSection = campaignType?.match(/volunteer/i)
  const otherSkillsRef = useRef<HTMLInputElement>(null);
  
  const otherSkillsEnabled = useMemo(() => {
    if (skillsNeeded?.includes("other")) {
      if (otherSkillsRef.current) {
        setTimeout(() => otherSkillsRef.current!.focus(), 0);
      }
      return true;
    } else {
      return false;
    }
  }, [skillsNeeded]);

  const toggleFundraise = (e: React.MouseEvent) => {
    e.preventDefault()
    setFundraiseOpen(prev => !prev)
  }

  const toggleVolunteer = (e: React.MouseEvent) => {
    e.preventDefault()
    setVolunteerCallOpen(prev => !prev)
  }

  // TODO: PUT ARIA-LABELS IN INPUTS TO MAKE THEM MORE ACCESSIBLE
  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* create campaign */}
      <div className="flex justify-between mb-5">
        <hgroup>
          <h1 className="text-lg mb-1">Create Campaign</h1>
          <p className="text-sm text-[#667085]">
            Now's your chance to tell your story!
          </p>
        </hgroup>

        <div>
          <WhiteButton text="Cancel" shadow className="mr-3" />
          <Button text="Launch Campaign" buttonType="submit" loading={isSubmitting} disabled={isSubmitting} />
        </div>
      </div>
      <hr className="mb-[26px]" />

        {/* title */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Title"
            detail="This will be displayed on your campaign."
          />
          <div className="max-w-lg">
            <TextInput
              config={register("title", {
                required: "Title is required",
              })}
              error={errors.title}
            />
          </div>
        </div>

        {/* campaign type */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Campaign Type"
            detail="Choose the type that fits the needs of your campaign."
          />
          <div className="max-w-lg">
            <SelectInput
              name="campaignType"
              options={campaignTypes}
              validation={{
                required: "Campaign type is required",
              }}
              error={errors.campaignType}
            />
          </div>
        </div>

        {/* category */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Category"
            detail="Choose the most relevant category that best represents your campaign."
          />
          <div className="max-w-lg">
            <SelectInput
              name="category"
              options={categories}
              validation={{
                required: "Category is required",
              }}
              error={errors.category}
            />
          </div>
        </div>

        {/* tell your story */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Tell Your Story"
            detail="The more details, the better."
          />
          <div className="max-w-lg">
            <TextAreaInput
              config={register("story", {
                required: "Story is required",
              })}
              characterLimit={300}
              control={control}
              error={errors.story}
            />
          </div>
        </div>
        <hr className="mb-5" />

      {/* FUNDRAISE */}
      {showFundraiseSection && <details open={fundraiseOpen} className={fundraiseOpen ? "mb-14" : ''}>
        <summary
          className="text-primary cursor-pointer mb-2"
          onClick={toggleFundraise}
        >
          Fundraise
        </summary>
        {/* set your funding goal */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Set Your Funding Goal"
            detail="You can always adjust your goal as your campaign progresses."
          />
          <div className="max-w-lg">
            <NumberInput
              config={register("fundingGoal", {
                required: "Funding goal is required",
              })}
              error={errors.fundingGoal}
              prefix="N"
            />
          </div>
        </div>

        {/* choose a campaign duration */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Choose a Campaign Duration"
            detail="Determine the timeframe for your campaign."
          />

          <div className="max-w-lg">
            <DateInput
              config={register("campaignDuration", {
                required: "Campaign duration is required",
              })}
              error={errors.campaignDuration}
              mode="range"
              enableTime
            />
          </div>
        </div>

        {/* upload engaging media */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Upload Engaging Media"
            detail="Visuals can make a significant impact on your campaign's success."
          />

          <div className="max-w-lg">
            <FileInput
              config={register("campaignImages", {
                required: "Campaign image is required",
              })}
              error={errors.campaignImages}
              multiple
              showFileList
            />
          </div>
        </div>
      </details>}

      {/* CALL FOR VOLUNTEERS */}
      {showVolunteerSection && <details open={volunteerOpen} className="mb-10">
        {/* TODO: STYLE DETAIL DROPDOWN ICON TO LOOK LIKE FIGMA */}
        <summary
          className="text-primary cursor-pointer mb-2"
          onClick={toggleVolunteer}
        >
          Call for Volunteers
        </summary>

        {/* skills needed */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Skills Needed" detail="Select all that apply" />

          <div className="max-w-lg">
            {skillsList.map((skill) => (
              <OptionInput
                type="radio"
                key={skill.value}
                value={skill.value}
                label={skill.label}
                config={register("skillsNeeded", {
                  required: "Skills needed is required",
                })}
              />
            ))}
            <div className="flex">
              <OptionInput
                type="radio"
                value="others"
                label="Other (please specify):"
                config={register("skillsNeeded")}
              />
              <input
                {...register("otherSkillsNeeded", {required: otherSkillsEnabled && "Other skills is required"})}
                id="otherSkillsNeeded"
                onChange={e => {
                  setValue('otherSkillsNeeded', e.target.value)
                  trigger('otherSkillsNeeded')
                }}
                ref={otherSkillsRef}
                disabled={!otherSkillsEnabled}
                className="-translate-y-1 border-t-0 border-b border-[#4c4c4c] border-dashed outline-none w-28 h-6 ml-2"
              />
            </div>
            {(errors.skillsNeeded || errors.otherSkillsNeeded) && (
              <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                {errors.skillsNeeded?.message || errors.otherSkillsNeeded?.message}
              </span>
            )}
          </div>
        </div>

        {/* age needed */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Age Range" />

          <div className="max-w-lg">
            {ageRanges.map((ageRange) => (
              <OptionInput
                type="radio"
                key={ageRange.value}
                value={ageRange.value}
                label={ageRange.label}
                config={register("ageRange", {
                  required: "Age needed is required",
                })}
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
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Gender Preference" />

          <div className="max-w-lg">
            {genderPreferences.map((genderPreference) => (
              <OptionInput
                type="radio"
                key={genderPreference.value}
                value={genderPreference.value}
                label={genderPreference.label}
                config={register("genderPreference", {
                  required: "Gender preference is required",
                })}
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
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Date and Time Needed" />

          <div className="max-w-lg">
            <DateInput
              config={register("timeCommitment", {
                required: "Time commitment is required",
              })}
              error={errors.timeCommitment}
              mode="range"
              enableTime
            />
          </div>
        </div>

        {/* volunteer commitment */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Volunteer Commitment" />

          <div className="max-w-lg">
            {volunteerCommitment.map((commitment) => (
              <OptionInput
                type="radio"
                key={commitment.value}
                value={commitment.value}
                label={commitment.label}
                config={register("volunteerCommitment", {
                  required: "Volunteer commitment is required",
                })}
              />
            ))}
            {errors.volunteerCommitment && (
              <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                {errors.volunteerCommitment?.message}
              </span>
            )}
          </div>
        </div>

        {/* additional requirements or notes */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Additional Requirements or Notes" />

          <div className="max-w-lg">
            <TextAreaInput
              config={register("additionalNotes", {
                required: "Additional notes required",
              })}
              characterLimit={300}
              control={control}
              error={errors.additionalNotes}
            />
          </div>
        </div>
      </details>}

      <div className="flex justify-end mb-5">
        <div>
          <WhiteButton text="Cancel" shadow className="mr-3" />
          <Button text="Launch Campaign" buttonType="submit" loading={isSubmitting} disabled={isSubmitting} />
        </div>
      </div>
    </form>
  );
};

export default CampaignForm;

type CampaignFormProps = {
  submit: (formFields: FormFields) => void;
};

function Option(value: string, label: string, isDisabled = false) {
  return { value, label, isDisabled };
}

const categories = [
  Option('', 'Select a category...', true),
  ...campaignCategories,
];

const campaignTypes = [
  Option('', 'Select a campaign type...', true),
  Option('fundraise', 'Fundraise'),
  Option('volunteer', 'Volunteer'),
  Option('fundraiseAndVolunteer', 'Fundraise and volunteer'),
]

const skillsList = [
  Option("event planning", "Event Planning"),
  Option("marketing & social media", "Marketing & Social Media"),
  Option("photography & videography", "Photography & Videography"),
  Option("teaching & training", "Teaching & Training"),
];

const ageRanges = [
  Option("18 - 25", "18 - 25"),
  Option("26 - 35", "26 - 35"),
  Option("36 - 45", "36 - 45"),
  Option("46 - 55", "46 - 55"),
  Option("56 and above", "56 and above"),
  Option("no preference", "No preference"),
];

const genderPreferences = [
  Option("female", "Female"),
  Option("male", "Male"),
  Option("no preference", "No preference"),
];

const volunteerCommitment = [
  Option("one-time event", "One-time event"),
  Option("weekly commitment", "Weekly commitment"),
  Option("monthly commitment", "Monthly commitment"),
  Option("flexible schedule", "Flexible schedule"),
];
