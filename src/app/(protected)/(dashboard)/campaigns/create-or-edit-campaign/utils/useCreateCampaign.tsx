import { useForm, FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

import { RFC } from "@/types/Component";
import { CampaignCategory } from "@/utils/campaignCategory";

const CampaignFormContext: RFC = ({ children }) => {
  const formContext: CampaignFormContext = {
    ...useForm<FormFields>(config),
  };

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default CampaignFormContext;
export type { CampaignFormContext, FormFields };

const config: UseFormConfig = {
  defaultValues: {},
  mode: "onChange",
};

type UseFormConfig = Parameters<typeof useForm<FormFields>>[0];
type FormFields = {
  title: string;
  category: CampaignCategory;
  story: string;
  fundingGoal: string;
  campaignDuration: string;
  campaignImages: string[];
  skillsNeeded: string[];
  otherSkillsNeeded: string;
  ageRange: string;
  genderPreference: string;
  timeCommitment: string;
  volunteerCommitment: string;
  additionalNotes: string;
};
type CampaignFormContext = UseFormReturn<FormFields>;
