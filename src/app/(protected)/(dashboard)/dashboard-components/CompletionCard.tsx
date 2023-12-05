"use client"
import { useModal } from "@/app/common/hooks/useModal"
import { Button, WhiteButton } from "./Button"

import { RFC } from "@/app/common/types"

const CompletionCard: RFC<CompletionCardProps> = ({
  title,
  text,
  primaryButton,
  secondaryButton,
  clearModal,
}) => {
  const boxShadow =
    "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)"
  const buttonClasses = "!justify-center font-semibold !text-base"

  return (
    <div
      style={{ boxShadow }}
      className="max-w-[342px] md:max-w-[544px] bg-white rounded-lg overflow-hidden p-4 md:p-6"
    >
      <div className="flex justify-between md:gap-4 mb-3 md:mb-8">
        <CheckIcon />

        <div className="hidden md:flex flex-col gap-1 mb-6">
          <p className="flex justify-between text-lg text-[#101828] font-semibold md:mb-1">
            {title}
            <XIcon onClick={clearModal} className="hidden md:inline cursor-pointer" />
          </p>
          <p className="text-sm text-[#475467] md:text-justify md:pr-2">
            {text}
          </p>
        </div>

        <XIcon onClick={clearModal} className="md:hidden cursor-pointer" />
      </div>

      <div className="flex flex-col md:hidden gap-1 mb-6">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-[#475467]">{text}</p>
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-3">
        <Button
          text={primaryButton.label}
          href={primaryButton.href}
          onClick={primaryButton.onClick}
          className={buttonClasses}
          shadow
        />
        <WhiteButton
          text={secondaryButton.label}
          href={secondaryButton.href}
          onClick={secondaryButton.onClick}
          outlineColor="#D0D5DD"
          className={buttonClasses}
        />
      </div>
    </div>
  )
}

export default CompletionCard

type CompletionCardProps = {
  title: string
  text: string
  primaryButton: Button
  secondaryButton: Button
  clearModal: () => void
}

type Button = {
  label: string
  href?: string
  onClick?: () => void
}

const CheckIcon = () => {
  const ringClasses =
    "absolute scale border rounded-full border-[#D0D5DD] left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] "

  return (
    <div className="relative grid place-content-center shrink-0 rounded-full bg-[#DCFAE6] w-12 h-12">
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className={
          ringClasses +
          "opacity-90 w-[calc(48px+(24px*2))] h-[calc(48px+(24px*2))]"
        }
      ></div>
      <div
        className={
          ringClasses +
          "opacity-70 w-[calc(48px+(24px*4))] h-[calc(48px+(24px*4))]"
        }
      ></div>
      <div
        className={
          ringClasses +
          "opacity-50 w-[calc(48px+(24px*6))] h-[calc(48px+(24px*6))]"
        }
      ></div>
      <div
        className={
          ringClasses +
          "opacity-30 w-[calc(48px+(24px*8))] h-[calc(48px+(24px*8))]"
        }
      ></div>
      <div
        className={
          ringClasses +
          "opacity-10 w-[calc(48px+(24px*10))] h-[calc(48px+(24px*10))]"
        }
      ></div>
    </div>
  )
}

const XIcon = ({ onClick, className }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#98A2B3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
