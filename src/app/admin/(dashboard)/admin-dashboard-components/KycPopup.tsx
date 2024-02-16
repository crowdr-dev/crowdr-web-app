import Image from "next/image"
import FileItem from "./FileItem"
import { Button, GrayButton } from "@/app/common/components/Button"

import XMark from "../../../../../public/svg/x-mark.svg"

const KycPopup = () => {
  const kycData = { isOrganzation: true, verified: false } // fetch kyc data

  return (
    <div className="grow max-w-[1031px] px-[50px] py-10 mb-11 border">
      <div className="flex justify-between items-center mb-11">
        <h2 className="font-semibold text-2xl text-black">KYC Information</h2>
        <Image src={XMark} alt="" />
      </div>

      <div className="flex flex-col gap-4 max-w-[440px] mb-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#61656B]">
              {kycData.isOrganzation ? "Organization" : "Individual"}
            </p>
            <h2 className="font-semibold text-2xl text-black">Crowdr Africa</h2>
          </div>
          {kycData.isOrganzation && (
            <p className="self-end font-semibold text-[#61656B]">4536673337</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {!kycData.isOrganzation && (
            <p className="text-xs text-[#61656B]">BVN Number</p>
          )}
          <p className="text-sm text-[#393E46]">
            The "Help Nicholas Go Back to College" campaign aims to raise funds
            to support Nicholas in pursuing his higher education dreams.
            Nicholas is a passionate and determined individual who, due to
          </p>
        </div>
      </div>

      <div className="mb-[55px]">
        <p className="font-semibold text-[#61656B] mb-4">
          Verification Documents
        </p>
        <div className="flex flex-col gap-5 max-w-[480px]">
          {files.map((file, next) => (
            <FileItem />
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {kycData.verified ? (
          <GrayButton
            text="KYC Verified"
            className="h-11 !w-[218px] !justify-center"
            onClick={() => {}}
            disabled
          />
        ) : (
          <>
            <GrayButton
              text="Decline"
              className="h-11 !w-[218px] !justify-center"
              onClick={() => {}}
            />
            <Button
              text="Approve KYC"
              loading={false}
              disabled={false}
              className="h-11 !w-[218px] !justify-center"
              onClick={() => {}}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default KycPopup

const files = [
  {
    name: "CAC Documents",
    size: "200 KB",
  },
  {
    name: "Company's logo",
    size: "200 KB",
  },
]
