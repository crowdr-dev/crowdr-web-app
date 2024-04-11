import { RFC } from "@/app/common/types"

const Label: RFC<LabelProps> = ({
  text,
  textColor = "#344054",
  bgColor = "#FFF",
  dotColor,
  className,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className={
        "inline-flex shrink-0 self-start items-center rounded-md border border-[#D0D5DD] px-1.5 py-0.5 " +
        className
      }
    >
      {dotColor && (
        <span
          style={{ backgroundColor: dotColor }}
          className="rounded-full h-2 w-2 mr-[6px]"
        ></span>
      )}
      <span style={{ color: textColor, fontSize: "12px" }}>{text}</span>
    </div>
  )
}

export default Label

type LabelProps = {
  text: string
  textColor?: string
  bgColor?: string
  dotColor?: string
  className?: string
}

const Approved = <Label text="Approved" dotColor="#17B26A" />
const Pending = <Label text="Pending" dotColor="#F3C729" />
const Rejected = <Label text="Rejected" dotColor="#F04438" />

export const label = (type: string) => {
  switch (type) {
    case "Approved":
    case "approved":
    case "completed":
      return Approved

    case "Pending":
    case "pending":
    case "in-review":
      return Pending

    case "rejected":
      return Rejected
  }
}
