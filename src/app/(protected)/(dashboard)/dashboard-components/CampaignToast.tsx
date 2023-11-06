import Image from "next/image"
import { Button, WhiteButton } from "./Button"

import { HiMiniXMark } from "react-icons/hi2"
// import CheckIcon from "../../../../../public/svg/check-circle.svg"
// import XIcon from "../../../../../public/svg/x-mark.svg"

const CampaignToast = () => {
  const boxShadow =
    "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)"
  const buttonClasses = "!justify-center font-semibold !text-base"

  return (
    <div style={{ boxShadow }} className="max-w-[342px] rounded-lg p-4">
      <div className="flex justify-between p-4 mb-3">
        {/* TODO: ADD RIPPLE EFFECT SURROUNDING ICON */}
        {/* <div className="grid place-content-center rounded-full bg-[#DCFAE6] w-12 h-12"> */}
          <CheckIcon />
        {/* </div> */}
        
        <div className="">
          <XIcon />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <p className="text-lg font-semibold">
          Donation Campaign created successfully
        </p>
        <p className="text-sm text-[#475467]">
          This donation campaign has been created successfully. You will be able
          to edit this campaign and republish changes.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button text="Share on your Socials" styles={{inner: buttonClasses}} shadow />
        <WhiteButton text="Cancel" outlineColor="#D0D5DD" styles={{inner: buttonClasses}} />
      </div>
    </div>
  )
}

export default CampaignToast

const CheckIcon = () => {
  const ringClasses = "absolute scale border rounded-full border-[#D0D5DD] w-12 h-12 "
  const outerRings = `
  0 0 0 20px rgba(0, 128, 0, 0.2),
  0 0 0 40px rgba(0, 128, 0, 0.4),
  0 0 0 60px rgba(0, 128, 0, 0.6),
  0 0 0 80px rgba(0, 128, 0, 0.8),
  0 0 0 100px rgba(0, 128, 0, 1)`
  
  return (
    <div style={{boxShadow: outerRings}} className="relative grid place-content-center rounded-full bg-[#DCFAE6] w-12 h-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#079455"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {/* <div className={ringClasses + "scale-[2]"}></div>
      <div className={ringClasses + "scale-[4]"}></div>
      <div className={ringClasses + "scale-[6]"}></div>
      <div className={ringClasses + "scale-[8]"}></div>
      <div className={ringClasses + "scale-[10]"}></div> */}
    </div>
  )
}

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#98A2B3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
