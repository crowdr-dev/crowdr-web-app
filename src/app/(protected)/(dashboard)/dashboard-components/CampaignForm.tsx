import { useFormContext } from "react-hook-form";
import CampaignFormContext from "../campaigns/create-or-edit-campaign/utils/useCreateCampaign";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import InputTitle from "./InputTitle";
import { campaignCategories } from "@/utils/campaignCategory";

import { RFC } from "@/types/Component";

const CampaignForm: RFC<CampaignFormProps> = ({submit}) => {
  const {register, control, handleSubmit, formState: {errors, isValid, isSubmitting} } = useFormContext() as CampaignFormContext;

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* title */}
      <div className="grid grid-cols-[350px_minmax(0,_1fr)] gap-x-[25px] mb-[25px]">
        <InputTitle title="Title" detail="This will be displayed on your campaign." />

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
        <InputTitle title="Category" detail="Choose the most relevant category that best represents your campaign." />

        <div className="max-w-lg">
          <SelectInput
            name="category"
            control={control}
            options={campaignCategories}
            validation={{ required: { value: true, message: "Category is required" }}}
            error={errors.category}
          />
        </div>
      </div>
    </form>
  );
};

export default CampaignForm;

type CampaignFormProps = {
  submit: () => void
}