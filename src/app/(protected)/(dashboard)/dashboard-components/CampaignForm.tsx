import { useState } from "react";
import { useFormContext } from "react-hook-form";
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

const CampaignForm: RFC<CampaignFormProps> = ({ submit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext() as CampaignFormContext;
  const [fundraiseOpen, setFundraiseOpen] = useState(true);
  const [volunteerCallOpen, setVolunteerCallOpen] = useState(true);
  const categories = [
    { value: "", label: "Select a category..." },
    ...campaignCategories,
  ];

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
          detail="Share your passion and purpose behind this campaign."
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
                required: { value: true, message: "Campaign duration is required" },
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
