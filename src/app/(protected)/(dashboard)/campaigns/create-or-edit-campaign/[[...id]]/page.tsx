"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import objectToFormData from "@/utils/objectToFormData"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import CampaignFormContext, { FormFields } from "../utils/useCreateCampaign"
import CampaignForm from "../../../dashboard-components/CampaignForm"
import CompletionCard from "../../../dashboard-components/CompletionCard"
import { useUser } from "../../../common/hooks/useUser"
import { useModal } from "@/app/common/hooks/useModal"
import { useToast } from "@/app/common/hooks/useToast"
import { Route } from "@/app/common/types"

const CreateEditCampaign = ({ params }: Route) => {
  const router = useRouter()
  const user = useUser()
  const modal = useModal()
  const toast = useToast()
  const isEdit = Boolean(params.id)

  const submit = async (formFields: FormFields) => {
    const {
      category,
      campaignImages,
      title,
      story,
      campaignType,
      skillsNeeded,
      otherSkillsNeeded,
      currency,
      fundingGoal,
      campaignDuration,
      ageRange,
      genderPreference,
      timeCommitment,
      volunteerCommitment,
      additionalNotes,
    } = formFields
    const isFundraiseRelated = campaignType?.match(/fundraise/i)
    const isVolunteerRelated = campaignType?.match(/volunteer/i)
    const isIndividual = user?.userType == "individual"

    const payload: any = {
      title,
      category: category,
      story: story,
      campaignType: isIndividual ? "fundraise" : campaignType,
    }

    // if (!isIndividual) payload.campaignStatus = "in-progress"

    if (isFundraiseRelated || isIndividual) {
      // TODO: MAKE objectToFormData handle converting nested objects to JSON
      payload.fundraise = JSON.stringify({
        fundingGoalDetails: [
          {
            amount: fundingGoal,
            currency,
          },
        ],
        startOfFundraise: campaignDuration[0],
        endOfFundraise: campaignDuration[1],
      })

      if (campaignImages) {
        payload.campaignCoverImage = campaignImages[0]
      }

      if (campaignImages && campaignImages?.length > 1) {
        payload.campaignAdditionalImages = campaignImages.slice(1)
      }
    }

    if (isVolunteerRelated) {
      payload.volunteer = JSON.stringify({
        skillsNeeded,
        otherSkillsNeeded,
        ageRange,
        genderPreference,
        commitementStartDate: timeCommitment[0],
        commitementEndDate: timeCommitment[1],
        requiredCommitment: volunteerCommitment,
        additonalNotes: additionalNotes,
      })
    }

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      }
      const endpoint = isEdit
        ? `/api/v1/campaigns/${params.id}`
        : "/api/v1/campaigns"

      const { success, message } = await makeRequest<{
        data: any
        success: boolean
        message: string
      }>(endpoint, {
        headers,
        method: isEdit ? "PUT" : "POST",
        payload: objectToFormData(payload),
      })

      if (success) {
        router.push("/campaigns")
        if (isEdit) {
          toast({ title: "Well done!", body: message })
        } else {
          modal.show(
            <CompletionCard
              title="Donation Campaign created successfully"
              text="This donation campaign has been created successfully. You will be
          able to edit this campaign and republish changes."
              primaryButton={{ label: "Share on your Socials" }}
              secondaryButton={{ label: "Cancel", onClick: modal.hide }}
              clearModal={modal.hide}
            />
          )
        }
      }
    } catch (error: any) {
      const message = extractErrorMessage(error)
      toast({ title: "Oops!", body: message, type: "error" })
    }
  }

  return (
    <div>
      <nav className="mb-[25px]">
        <Link href="/campaigns" className="opacity-50">
          Go back
        </Link>
      </nav>

      <CampaignFormContext>
        <CampaignForm submit={submit} campaignId={params.id} />
      </CampaignFormContext>
    </div>
  )
}

export default CreateEditCampaign
