"use client"
import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import objectToFormData from "@/utils/objectToFormData"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import CampaignFormContext, { FormFields } from "../utils/useCreateCampaign"
import CampaignForm from "../../../dashboard-components/CampaignForm"
import CompletionCard from "../../../dashboard-components/CompletionCard"
import { useUser } from "../../../common/hooks/useUser"
import { useModal } from "@/app/common/hooks/useModal"
import { useToast } from "@/app/common/hooks/useToast"
import { Mixpanel } from "@/utils/mixpanel"
import { shareCampaignModalAtom } from "../../layout"
import kycService from "@/app/(protected)/(dashboard)/common/services/kycService"

import { Route } from "@/app/common/types"
import { ICampaign } from "@/app/common/types/Campaign"

const CreateEditCampaign = ({ params }: Route) => {
  const setShareCampaignModal = useSetAtom(shareCampaignModalAtom)
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
    const isFundraiseRelated = Boolean(campaignType?.match(/fundraise/i))
    const isVolunteerRelated = Boolean(campaignType?.match(/volunteer/i))
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
      modal.hide()
      setShareCampaignModal({ isOpen: true, campaign })

      // if (navigator.share) {
      //   try {
      //     modal.hide()
      //     await navigator.share({
      //       title: campaign.title,
      //       text: campaign.story,
      //       url: `https://oncrowdr.com/explore-campaigns/donate-or-volunteer/${campaign._id}`,
      //     })
      //   } catch (error) {
      //     console.error("Error sharing:", error)
      //   }
      // } else {
      //   console.warn("Web Share API not supported.")
      // }
    }

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      }
      const endpoint = isEdit
        ? `/api/v1/campaigns/${params.id}`
        : "/api/v1/campaigns"

      const { success, message, data } = await makeRequest<ICampaign>(
        endpoint,
        {
          headers,
          method: isEdit ? "PUT" : "POST",
          payload: objectToFormData(payload),
        }
      )

      if (success) {
        switch (true) {
          case isFundraiseRelated && isVolunteerRelated:
            Mixpanel.track("Donation and Volunteer Campaign created")
            break
          case isFundraiseRelated:
            Mixpanel.track("Donation Campaign created")
            break
          case isVolunteerRelated:
            Mixpanel.track("Volunteer Campaign created")
            break
        }

        router.push("/campaigns")

        try {
          await kycService.getKyc({ userToken: user?.token || "" })

          if (isEdit) {
            toast({ title: "Well done!", body: message })
          } else {
            modal.show(
              <CompletionCard
                title="Campaign created successfully"
                text="This campaign has been created successfully. You will be able to edit this campaign and republish changes."
                primaryButton={{
                  label: "Share on your Socials",
                  onClick: () => shareCampaign(data),
                }}
                secondaryButton={{ label: "Cancel", onClick: modal.hide }}
                clearModal={modal.hide}
              />
            )
          }
        } catch (error) {
          modal.show(
            <CompletionCard
              title="Complete campaign setup!"
              text="Upload your identity verification info in settings to finish creating your campaign."
              primaryButton={{
                label: "Upload KYC",
                onClick: () => {
                  router.push("/settings/verification")
                  modal.hide()
                },
              }}
              secondaryButton={{ label: "Cancel", onClick: modal.hide }}
              clearModal={modal.hide}
              icon={
                <div className="grid place-items-center rounded-full bg-[#FEF0C7] p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                      stroke="#FFC328"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              }
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
