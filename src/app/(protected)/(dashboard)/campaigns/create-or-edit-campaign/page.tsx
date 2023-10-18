"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CampaignFormContext, { FormFields } from "./utils/useCreateCampaign";
import CampaignForm from "../../dashboard-components/CampaignForm";
import makeRequest from "@/utils/makeRequest";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { getUser } from "@/app/api/user/getUser";
import useToast from "@/hooks/useToast";
import objectToFormData from "@/utils/objectToFormData";

const CreateEditCampaign = () => {
  const router = useRouter()
  const toast = useToast();

  const submit = async (formFields: FormFields) => {
    console.log(formFields);
    const {
      category,
      campaignImages,
      title,
      story,
      campaignType,
      skillsNeeded,
      otherSkillsNeeded,
      fundingGoal,
      campaignDuration,
      ageRange,
      genderPreference,
      timeCommitment,
      volunteerCommitment,
      additionalNotes,
    } = formFields;
    const campaignCoverImage = campaignImages[0];
    const campaignAdditionalImages = campaignImages.length > 1 ? campaignImages.slice(1) : null
    const endpoint = "/api/v1/campaigns";

    const payload = {
      title,
      category: category,
      campaignCoverImage,
      campaignAdditionalImages,
      story: story,
      campaignType: campaignType,
      campaignStatus: "in-progress",
      // TODO: MAKE objectToFormData handle converting nested objects to JSON
      fundraise: JSON.stringify({
        fundingGoalDetails: [
          {
            // TODO: MAKE SURE NUMBER INPUT HANDLES CONVERSION TO NUMBER
            amount: Number(fundingGoal.replace(/[^0-9.]/gi, '')),
            currency: 'naira'
          }
        ],
        startOfFundraise: campaignDuration[0],
        endOfFundraise: campaignDuration[1]
      }),
      volunteer: JSON.stringify({
        skillsNeeded,
        otherSkillsNeeded,
        ageRange,
        genderPreference,
        commitementStartDate: timeCommitment[0],
        commitementEndDate: timeCommitment[1],
        requiredCommitment: volunteerCommitment,
        additonalNotes: additionalNotes
      })
    };

    try {
      const user = await getUser();
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      };
      const { success, message } = await makeRequest<{ data: any, success: boolean, message: string }>(endpoint, {
        headers,
        method: "POST",
        payload: objectToFormData(payload),
      });

      if (success) {
        toast({title: 'Well done!', body: message})
        router.push("/campaigns");
      }
    } catch (error: any) {
      const message = extractErrorMessage(error);
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  return (
    <div>
      <nav className="mb-[25px]">
        <Link href="/campaigns" className="opacity-50">
          Go back
        </Link>
      </nav>

      <CampaignFormContext>
        <CampaignForm submit={submit} />
      </CampaignFormContext>
    </div>
  );
};

export default CreateEditCampaign;
