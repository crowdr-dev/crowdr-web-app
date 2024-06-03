"use client"
import { useRouter } from "next/navigation"
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
import { Mixpanel } from "@/utils/mixpanel"
import { ICampaign } from "@/app/common/types/Campaign"

const CreateEditCampaign = ({ params }: Route) => {
  const router = useRouter()
  const user = useUser()
  const modal = useModal()
  const toast = useToast()
  const isEdit = Boolean(params.id)

  const submit = async (formFields: FormFields) => {
    Mixpanel.track("Create campaign clicked")
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
      category,
      story,
      campaignType: isIndividual ? "fundraise" : campaignType,
      // campaignStartDate: campaignDuration[0],
      // campaignEndDate: campaignDuration[1],
      campaignStartDate: new Date(
        campaignDuration[0] as any as Date
      ).toISOString(),
      campaignEndDate: new Date(
        campaignDuration[1] as any as Date
      ).toISOString(),
    }

    if (campaignImages) {
      payload.campaignCoverImage = campaignImages[0]

      if (campaignImages.length > 1) {
        payload.campaignAdditionalImages = campaignImages.slice(1)
      }
    }

    if (isFundraiseRelated || isIndividual) {
      // TODO: MAKE objectToFormData handle converting nested objects to JSON
      payload.fundraise = JSON.stringify({
        fundingGoalDetails: [
          {
            amount: fundingGoal,
            currency,
          },
        ],
      })
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

    const shareCampaign = async (campaign: ICampaign) => {
      if (navigator.share) {
        try {
          modal.hide()
          await navigator.share({
            title: campaign.title,
            text: campaign.story,
            url: `https://oncrowdr.com/explore-campaigns/donate-or-volunteer/${campaign._id}`,
          })
          // console.log("Successfully shared")
        } catch (error) {
          console.error("Error sharing:", error)
        }
      } else {
        console.warn("Web Share API not supported.")
      }
    }

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      }
      const endpoint = isEdit
        ? `/api/v1/campaigns/${params.id}`
        : "/api/v1/campaigns"

      const { success, message, data } = await makeRequest<ICampaign>(endpoint, {
        headers,
        method: isEdit ? "PUT" : "POST",
        payload: objectToFormData(payload),
      })

      if (success) {
        Mixpanel.track(isFundraiseRelated? "Donation Campaign created" : "Volunteer Campaign created")
        router.push("/campaigns")

        if (isEdit) {
          toast({ title: "Well done!", body: message })
        } else {
          modal.show(
            <CompletionCard
              title="Campaign created successfully"
              text="This campaign has been created successfully. You will be
          able to edit this campaign and republish changes."
              primaryButton={{ label: "Share on your Socials", onClick: () => shareCampaign(data) }}
              secondaryButton={{ label: "Cancel", onClick: modal.hide }}
              clearModal={modal.hide}
            />
          )
        }
      }
    } catch (error: any) {
      Mixpanel.track("Campaign creation error")
      const message = extractErrorMessage(error)
      toast({ title: "Oops!", body: message, type: "error" })
    }
  }

  return (
    <div>
      <nav className="mb-[25px]">
        <div
          onClick={() => router.back()}
          className="cursor-pointer opacity-50"
        >
          Go back
        </div>
      </nav>

      <CampaignFormContext>
        <CampaignForm submit={submit} campaignId={params.id} />
      </CampaignFormContext>
    </div>
  )
}

export default CreateEditCampaign
