import { useEffect, useRef, useState } from "react"
import moment from "moment"
import flatpickr from "flatpickr"

import { RFC } from "@/app/common/types"
import "flatpickr/dist/flatpickr.min.css"

const DateRange: RFC<DateRangeProps> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState<IRangeLabel | null>(null)
  const customButtonRef = useRef(null)
  const buttonClasses =
    "px-4 py-[10px] text-sm font-medium text-[#1D2939] bg-white border border-[#D0D5DD] focus:bg-[#F9FAFB] hover:text-primary"
    " focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"

  useEffect(() => {
    if (customButtonRef.current) {
      flatpickr(customButtonRef.current, {
        mode: "range",
        wrap: true,
        maxDate: "today",
        static: true,
        onChange: (selectedDates, dateStr, instance) => {
          if (selectedDates.length === 2) {
            const [startDate, endDate] = selectedDates
            onChange([moment(startDate), moment(endDate).endOf("day")])
          }
        },
      })
    }
  }, [])

  const handleRangeSelect = (dateRange: IRangeOption) => {
    if (selectedRange === dateRange.label) {
      setSelectedRange(null)
      onChange(null)
    } else {
      setSelectedRange(dateRange.label)
      onChange([dateRange.startTime(), moment()])
    }
  }

  return (
    <div className="inline-flex rounded-md" role="group">
      <div ref={customButtonRef}>
        <input hidden data-input />
        <button
          type="button"
          data-toggle
          className={buttonClasses + " rounded-l-lg relative z-10"}
        >
          Custom
        </button>
      </div>

      {rangeOptions.map((rangeOption, index) => {
        const isLastItem = index + 1 === rangeOptions.length
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleRangeSelect(rangeOption)}
            className={buttonClasses + " border-l-0" + (isLastItem ? " rounded-r-lg" : "")}
          >
            {rangeOption.label}
          </button>
        )
      })}
    </div>
  )
}

export default DateRange

type DateRangeProps = {
  onChange: (dateRange: IDateRange | null) => void
}

export type IDateRange = [moment.Moment, moment.Moment] | null
type IRangeLabel = "Custom" | (typeof rangeOptions)[number]["label"]
type IRangeOption = (typeof rangeOptions)[number]

function timeAgo(amount: number, unit: moment.unitOfTime.DurationConstructor) {
  return () => moment().subtract(amount, unit)
}

const rangeOptions = [
  {
    label: "7 days",
    startTime: timeAgo(7, "days"),
  },
  {
    label: "24 hours",
    startTime: timeAgo(24, "hours"),
  },
] as const
