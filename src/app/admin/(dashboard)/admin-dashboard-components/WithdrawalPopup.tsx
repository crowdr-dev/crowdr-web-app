"use client"
import Image from "next/image"
import { Button, GrayButton } from "@/app/common/components/Button"
import TextInput from "@/app/common/components/TextInput"
import ModalTrigger from "@/app/common/components/ModalTrigger"

import XMark from "../../../../../public/svg/x-mark.svg"

const WithdrawalPopup = () => {
  const withdrawalData = { isOrganzation: true, verified: false } // fetch kyc data

  if (withdrawalData)
    return (
      <div className="grow max-w-[1031px] bg-white px-[50px] py-10 mb-11 border">
        <div className="flex justify-between items-center mb-11">
          <h2 className="font-semibold text-2xl text-black">Withdrawal</h2>
          <ModalTrigger id="withdrawalPopup" type="hide">
            <Image src={XMark} alt="" />
          </ModalTrigger>
        </div>

        <div className="flex flex-col gap-4 max-w-[440px] mb-[7px]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#61656B]">
                {withdrawalData.isOrganzation ? "Organization" : "Individual"}
              </p>
              <h2 className="font-semibold text-2xl text-black">
                Crowdr Africa
              </h2>
            </div>
            {withdrawalData.isOrganzation && (
              <p className="self-end font-semibold text-[#61656B]">
                4536673337
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {!withdrawalData.isOrganzation && (
              <p className="text-xs text-[#61656B]">BVN Number</p>
            )}
            <p className="text-sm text-[#393E46]">
              The "Help Nicholas Go Back to College" campaign aims to raise
              funds to support Nicholas in pursuing his higher education dreams.
              Nicholas is a passionate and determined individual who, due to
            </p>
          </div>
        </div>

        <div className="px-[10px] max-w-[512px]">
          <div className="flex flex-col gap-[26px] pt-[10px] mb-10">
            <TextInput label="Account number" value="2108051917" disabled />
            <TextInput label="Bank" value="Access Bank" disabled />
            <TextInput label="Account name" value="John Doe" disabled />
          </div>

          <div className="flex gap-6">
            <GrayButton
              text="Decline"
              className="h-11 !w-[218px] !justify-center"
              onClick={() => {}}
            />
            <Button
              text="Approve Withdrawal"
              loading={false}
              disabled={false}
              className="h-11 !w-[218px] !justify-center"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    )

  return "loading"
}

export default WithdrawalPopup
