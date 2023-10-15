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

import { campaignCategories } from "@/utils/campaignCategory";
import { RFC } from "@/types/Component";
import OptionInput from "./OptionInput";

const CampaignForm: RFC<CampaignFormProps> = ({ submit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext() as CampaignFormContext;
  const skillsNeeded = useWatch({ control, name: "skillsNeeded" });
  const otherSkillsRef = useRef<HTMLInputElement>(null);
  const [fundraiseOpen, setFundraiseOpen] = useState(true);
  const [volunteerCallOpen, setVolunteerCallOpen] = useState(true);
  const categories = [
    { value: "", label: "Select a category..." },
    ...campaignCategories,
  ];

  const enableOtherSkillsInput = useMemo(() => {
    if (skillsNeeded?.includes("other")) {
      if (otherSkillsRef.current) {
        setTimeout(() => otherSkillsRef.current!.focus(), 0);
      }
      return true;
    } else {
      return false;
    }
  }, [skillsNeeded]);

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
          <Button text="Launch Campaign" buttonType="submit" />
        </div>
      </div>
      <hr className="mb-[26px]" />

      <div>
        {/* title */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle
            title="Title"
            detail="This will be displayed on your campaign."
          />
          <div className="max-w-lg">
            <TextInput
              config={register("title", {
                required: { value: true, message: "Title is required" },
              })}
              error={errors.title}
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
              control={control}
              options={categories}
              validation={{
                required: { value: true, message: "Category is required" },
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
                required: { value: true, message: "Story is required" },
              })}
              characterLimit={300}
              control={control}
              error={errors.story}
            />
          </div>
        </div>
        <hr className="mb-5" />
      </div>

      {/* FUNDRAISE */}
      <details open={fundraiseOpen} className="mb-14">
        <summary
          className="text-primary cursor-pointer mb-2"
          onClick={(prev) => setFundraiseOpen(!prev)}
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
                required: { value: true, message: "Funding goal is required" },
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
                required: {
                  value: true,
                  message: "Campaign duration is required",
                },
              })}
              error={errors.campaignDuration}
              mode="range"
              enableTime
            />
          </div>
        </div>
      </details>

      {/* CALL FOR VOLUNTEERS */}
      <details open={volunteerCallOpen} className="mb-10">
        <summary
          className="text-primary cursor-pointer mb-2"
          onClick={(prev) => setVolunteerCallOpen(!prev)}
        >
          Call for Volunteers
        </summary>

        {/* skills needed */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Skills Needed" detail="Select all that apply" />

          <div className="max-w-lg">
            {skillsList.map((skill) => (
              <OptionInput
                type="checkbox"
                value={skill.value}
                label={skill.label}
                config={register("skillsNeeded")}
              />
            ))}
            <div className="flex">
              <OptionInput
                type="checkbox"
                value="other"
                label="Other (please specify):"
                config={register("skillsNeeded")}
              />
              <input
                {...register("otherSkillsNeeded")}
                ref={otherSkillsRef}
                disabled={!enableOtherSkillsInput}
                className="-translate-y-1 border-b border-[#4c4c4c] border-dashed outline-none w-28 h-6 ml-2"
              />
            </div>
          </div>
        </div>

        {/* age needed */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Age Range" />

          <div className="max-w-lg">
            {ageRanges.map((ageRange) => (
              <OptionInput
                type="radio"
                value={ageRange.value}
                label={ageRange.label}
                config={register("ageRange")}
              />
            ))}
          </div>
        </div>

        {/* gender preference */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Gender Preference" />

          <div className="max-w-lg">
            {genderPreferences.map((genderPreference) => (
              <OptionInput
                type="radio"
                value={genderPreference.value}
                label={genderPreference.label}
                config={register("genderPreference")}
              />
            ))}
          </div>
        </div>

        {/* date and time needed */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Date and Time Needed" />

          <div className="max-w-lg">
            <DateInput
              config={register("timeCommitment", {
                required: {
                  value: true,
                  message: "Time commitment is required",
                },
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
                value={commitment.value}
                label={commitment.label}
                config={register("volunteerCommitment")}
              />
            ))}
          </div>
        </div>

        {/* additional requirements or notes */}
        <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
          <InputTitle title="Additional Requirements or Notes" />

          <div className="max-w-lg">
            <TextAreaInput
              config={register("additionalNotes", {
                required: { value: true, message: "Additional notes required" },
              })}
              characterLimit={300}
              control={control}
              error={errors.additionalNotes}
            />
          </div>
        </div>
      </details>

      <div className="flex justify-end mb-5">
        <div>
          <WhiteButton text="Cancel" shadow className="mr-3" />
          <Button text="Launch Campaign" buttonType="submit" />
        </div>
      </div>
    </form>
  );
};

export default CampaignForm;

type CampaignFormProps = {
  submit: (formFields: FormFields) => void;
};

function Option(value: string, label: string) {
  return { value, label };
}

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
