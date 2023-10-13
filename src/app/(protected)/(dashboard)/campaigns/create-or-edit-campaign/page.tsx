'use client'
import Link from "next/link";
import CampaignFormContext, { FormFields } from "./utils/useCreateCampaign";
import { Button, WhiteButton } from "../../dashboard-components/Button";
import CampaignForm from "../../dashboard-components/CampaignForm";

const CreateEditCampaign = () => {
  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <div>
      <nav className="mb-[25px]">
        <Link href="/campaigns" className="opacity-50">Go back</Link>
      </nav>

      <CampaignFormContext>
        <CampaignForm submit={submit} />
      </CampaignFormContext>
    </div>
  );
}

export default CreateEditCampaign;