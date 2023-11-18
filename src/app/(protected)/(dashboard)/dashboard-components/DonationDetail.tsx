import { RFC } from "@/app/common/types/Component"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import Label from "./Label"

const DonationDetail: RFC<DonationDetailProps> = ({
  campaign,
  amount,
  date,
  status,
}) => {
  return (
    <details className="group border-b border-[#DDD] marker:hidden pb-6 mb-5">
      <summary className="flex items-center group-open:items-end justify-between group-open:mb-4">
        <div className="flex flex-col gap-2 text-sm">
          <p className="hidden group-open:block text-xs text-[#667085] mb-[9px]">
            Campaign
          </p>
          <p className="text-[#667085]">{campaign}</p>
          <p className="group-open:hidden text-[#555] text-sm">{amount}</p>
        </div>

        <FaChevronDown className="group-open:hidden" />
        <FaChevronUp className="hidden group-open:block" />
      </summary>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#555]">{amount}</p>
          <p className="text-sm text-[#667085]">{date}</p>
        </div>

        <Label text={status} />
      </div>
    </details>
  )
}

export default DonationDetail

type DonationDetailProps = {
  campaign: string
  amount: string
  date: string
  status: string
}
