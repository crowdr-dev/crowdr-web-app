import { useForm, FormProvider } from "react-hook-form"
import { UseFormReturn } from "react-hook-form/dist/types"

import { RFC } from "@/app/common/types"
import { CampaignCategory } from "@/utils/campaignCategory"
import {
  CampaignType,
  ICampaign,
  IFundraiseVolunteerCampaign,
} from "@/app/common/types/Campaign"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useQuery } from "react-query"
import { mapResponseToForm } from "@/app/(protected)/(dashboard)/dashboard-components/CampaignForm"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import makeRequest from "@/utils/makeRequest"
import { useUser } from "@/app/(protected)/(dashboard)/common/hooks/useUser"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/common/hooks/useToast"
import { Mixpanel } from "@/utils/mixpanel"
import objectToFormData from "@/utils/objectToFormData"
import kycService from "@/app/(protected)/(dashboard)/common/services/kycService"
import CompletionCard from "@/app/(protected)/(dashboard)/dashboard-components/CompletionCard"
import { useModal } from "@/app/common/hooks/useModal"
import { shareCampaignModalAtom } from "@/app/(protected)/(dashboard)/utils/atoms"
import { useSetAtom } from "jotai"
import CampaignPreview from "./CampaignPreview"

// export const CampaignContext = createContext({} as CampaignFormContext)

const CampaignProvider: RFC<Props> = ({ children, campaignId }) => {
  const form = useForm<FormFields>(config)
  const user = useUser()
  const router = useRouter()
  const modal = useModal()
  const toast = useToast()
  const isEdit = Boolean(campaignId)
  const setShareCampaignModal = useSetAtom(shareCampaignModalAtom)
  const [campaignType, setCampaignType] = useState<CampaignType>()
  const [campaignForm, setCampaignForm] = useState<CampaignForm>()
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    const initCampaignForm = (campaignType: CampaignType) => {
      // console.log(campaignType)
      if (campaignType === "volunteer") {
        setCampaignForm("volunteer")
      } else {
        setCampaignForm("fundraise")
      }
    }

    if (user && campaignId) {
      const fetchCampaignData = async () => {
        try {
          const endpoint = `/api/v1/my-campaigns/${campaignId}`
          const headers = {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.token,
          }

          const { data } = await makeRequest<IFundraiseVolunteerCampaign>(
            endpoint,
            {
              headers,
              method: "GET",
            }
          )

          const formData = mapResponseToForm(data)
          form.reset(formData)
          setCampaignType(data.campaignType)
          initCampaignForm(data.campaignType)
          // setFormFetched(true)
        } catch (error) {
          const message = extractErrorMessage(error)
          toast({ title: "Oops!", body: message, type: "error" })
          router.back()
        }
      }

      fetchCampaignData()
    } else {
      const currentUrl = window.location.href
      const url = new URL(currentUrl)
      const queryParams = url.searchParams
      const campaignType = (queryParams.get("type") ||
        "fundraise") as CampaignType
      setCampaignType(campaignType)
      initCampaignForm(campaignType)
    }
  }, [user])

  const submit = async (formFields: FormFields) => {
    Mixpanel.track("Create campaign clicked")
    // console.log(formFields)

    // const formFields = form.getValues()
    const {
      category,
      campaignImages,
      title,
      story,
      // campaignType,
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
    }

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": user?.token!,
      }
      const endpoint = isEdit
        ? `/api/v1/campaigns/${campaignId}`
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

  const formContext: CampaignFormContext = {
    isEdit,
    campaignType,
    campaignForm,
    showPreview,
    setShowPreview,
    setCampaignForm,
    submitForm: form.handleSubmit(submit),
    ...form,
  }

  if (campaignId && !form.getValues().title) {
    return "loading"
  }

  return (
    <FormProvider {...formContext}>
      {children}
      <CampaignPreview />
    </FormProvider>
  )
}

export default CampaignProvider

interface Props {
  campaignId?: string
}

export type { CampaignProvider, FormFields }

const config: UseFormConfig = {
  defaultValues: {
    title: "",
    category: "" as any,
    campaignType: "" as any,
    story: "",
    currency: "",
    skillsNeeded: [],
    ageRange: "",
    genderPreference: "",
    volunteerCommitment: "",
    additionalNotes: "",
  },
  mode: "onChange",
}

type UseFormConfig = Parameters<typeof useForm<FormFields>>[0]
type FormFields = {
  title: string
  category: CampaignCategory
  campaignType: CampaignType
  story: string
  currency: string
  fundingGoal: number
  campaignDuration: [string, string]
  campaignImages?: File[]
  skillsNeeded: string[]
  otherSkillsNeeded: string
  ageRange: string
  genderPreference: string
  timeCommitment: [string, string]
  volunteerCommitment: string
  additionalNotes: string
}
// type CampaignFormProvider = UseFormReturn<FormFields>

type CampaignForm = "fundraise" | "volunteer"
export type CampaignFormContext = {
  campaignType: CampaignType | undefined
  campaignForm: CampaignForm | undefined
  showPreview: boolean
  setShowPreview: Dispatch<SetStateAction<boolean>>
  setCampaignForm: Dispatch<SetStateAction<CampaignForm | undefined>>
  submitForm: (e?: React.BaseSyntheticEvent) => Promise<void>
  isEdit: boolean
} & UseFormReturn<FormFields>
