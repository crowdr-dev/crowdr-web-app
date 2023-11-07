"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import objectToFormData from "@/utils/objectToFormData"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import CampaignFormContext, { FormFields } from "./utils/useCreateCampaign"
import { useUser } from "../../utils/useUser"
import { useModal } from "@/app/common/hooks/useModal"
import { getUser } from "@/app/api/user/getUser"
import { useToast } from "@/app/common/hooks/useToast"
import CampaignForm from "../../dashboard-components/CampaignForm"
import CampaignToast from "../../dashboard-components/CampaignModal"

const CreateEditCampaign = () => {
  const router = useRouter()
  const user = useUser()
  const modal = useModal()
  const toast = useToast()

  const submit = async (formFields: FormFields) => {
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
    } = formFields
    const isFundraiseRelated = campaignType?.match(/fundraise/i)
    const isVolunteerRelated = campaignType?.match(/volunteer/i)
    const isIndividual = user?.userType == "individual"
    const endpoint = "/api/v1/campaigns"

    const payload: any = {
      title,
      category: category,
      story: story,
      campaignType: isIndividual ? "fundraise" : campaignType,
    }

    if (!isIndividual) payload.campaignStatus = "in-progress"

    if (isFundraiseRelated || isIndividual) {
      payload.campaignCoverImage = campaignImages[0]
      // TODO: MAKE objectToFormData handle converting nested objects to JSON
      payload.fundraise = JSON.stringify({
        fundingGoalDetails: [
          {
            amount: fundingGoal,
            currency: "naira",
          },
        ],
        startOfFundraise: campaignDuration[0],
        endOfFundraise: campaignDuration[1],
      })

      if (campaignImages.length > 1) {
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
      const user = await getUser()
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      }
      const { success, message } = await makeRequest<{
        data: any
        success: boolean
        message: string
      }>(endpoint, {
        headers,
        method: "POST",
        payload: objectToFormData(payload),
      })

      if (success) {
        router.push("/campaigns")
        modal.show(<CampaignToast />)
        // toast({ title: "Well done!", body: message })
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
        <CampaignForm submit={submit} />
      </CampaignFormContext>
    </div>
  )
}

export default CreateEditCampaign
