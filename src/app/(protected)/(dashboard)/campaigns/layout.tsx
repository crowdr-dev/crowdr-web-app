"use client"
import { atom, useAtom } from "jotai"
import OldModal from "@/app/common/components/OldModal"
import ShareCampaign from "@/app/common/components/share-campaign"

import { RFC } from "@/app/common/types"
import { ICampaign } from "@/app/common/types/Campaign"

export const shareCampaignModalAtom = atom<IShareCampaignModal>({
  isOpen: false,
  campaign: null,
}) as never

const CampaignsPageLayout: RFC = ({ children }) => {
  const [{ isOpen, campaign }, setShareCampaignModal] = useAtom(
    shareCampaignModalAtom
  ) as any

  const closeShareModal = () => {
    setShareCampaignModal({ isOpen: false, campaign: null })
  }

  return (
    <>
      {children}

      {campaign && (
        <OldModal isOpen={isOpen} onClose={closeShareModal}>
          <div
            className="relative p-12"
            style={{
              background: "rgba(76, 76, 76, 0)",
            }}
          >
            <ShareCampaign
              onClose={closeShareModal}
              campaignId={campaign._id}
              title={campaign.title}
              story={campaign.story}
              campaignCoverImage={campaign.campaignCoverImage.url}
            />
          </div>
        </OldModal>
      )}
    </>
  )
}

export default CampaignsPageLayout

export interface IShareCampaignModal {
  isOpen: boolean
  campaign: ICampaign | null
}
