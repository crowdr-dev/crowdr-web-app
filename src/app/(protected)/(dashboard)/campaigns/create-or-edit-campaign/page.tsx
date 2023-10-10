'use client'
import Link from "next/link";
import CampaignFormContext from "./utils/useCreateCampaign";
import { Button, WhiteButton } from "../../dashboard-components/Button";
import CampaignForm from "../../dashboard-components/CampaignForm";

const CreateEditCampaign = () => {
  const submit = async () => {
    console.log("SUBMITTED")
  }

  return (
    <div>
      <nav className="mb-[25px]">
        <Link href="/campaigns" className="opacity-50">Go back</Link>
      </nav>

      {/* create campaign */}
      <div className="flex justify-between mb-5">
        <hgroup>
          <h1 className="text-lg mb-1">Create Campaign</h1>
          <p className="text-sm text-[#667085]">Now's your chance to tell your story!</p>
        </hgroup>

        <div>
          <WhiteButton text="Cancel" shadow className="mr-3" />
          <Button text="Save" />
        </div>
      </div>
      <hr className="mb-[26px]" />

      <CampaignFormContext>
        <CampaignForm submit={submit} />
      </CampaignFormContext>
    </div>
  );
}

export default CreateEditCampaign;