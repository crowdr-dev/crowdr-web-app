import { RFC } from "@/app/common/types"
import { IconType } from "react-icons/lib"

const Stepper: RFC<Props> = ({ value, steps }) => {
  return (
    <div className="grid place-items-center mb-10">
      <div className="flex items-center w-full max-w-[713px]">
        {steps.map((step, index) => {
          const active = value >= index

          return (
            <>
              {index !== 0 && (
                <div
                  key={`line-${index}`}
                  className="grow h-0.5"
                  style={{ background: active ? "#8ADFB8" : "#EAECF0" }}
                />
              )}

              <div
                key={index}
                className="relative rounded-lg border border-[#EAECF0] p-2.5"
                style={{ boxShadow: "0px 1px 2px 0px #1018280D" }}
              >
                <step.icon size={20} fill={active ? "#008347" : "#344054"} />

                <div
                  className="absolute -bottom-[34px] left-[50%] -translate-x-[50%] font-semibold whitespace-nowrap"
                  style={{ color: active ? "#008347" : "#344054" }}
                >
                  {step.label}
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper

interface Props {
  value: number
  steps: Step[]
}

interface Step {
  label: string
  icon: IconType
}
