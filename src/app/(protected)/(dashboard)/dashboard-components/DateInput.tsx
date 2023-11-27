import { useEffect, useRef } from "react"
// TODO: POSSIBLY SWITCH TO react-flatpickr
import flatpickr from "flatpickr"
import {
  useFormContext,
  FieldError,
  UseFormRegisterReturn,
  RegisterOptions,
} from "react-hook-form"

import { RFC } from "@/app/common/types"
import { Instance as Flatpickr } from "flatpickr/dist/types/instance"
import "flatpickr/dist/flatpickr.min.css"

// TODO: INTERNATIONALIZE DATE VALUES; CONVERT TO AND FROM UTC WHEN SENDING AND RECEIVING DATE TO AND FROM SERVER
const DateInput: RFC<DateInputProps> = ({
  config,
  label,
  error,
  placeholder,
  showOptionalLabel,
  mode,
  dateFormat,
  enableTime,
  minDate,
  value,
  onChange,
  name,
  controlled,
  rules
}) => {
  if (!controlled && !config && name) {
    const {register} = useFormContext()
    config = register(name, rules)
  }

  if (config) {
    var { setValue, getValues, setError } = useFormContext()
    var dateRange = getValues(config.name)
  } else {
    var dateRange = value as any
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const flatpickrInstance = useRef<Flatpickr>()
  

  useEffect(() => {
    if (inputRef.current) {
      flatpickrInstance.current = flatpickr(inputRef.current, {
        mode,
        dateFormat,
        enableTime,
        minDate,
        static: true,
        locale: {
          rangeSeparator: " — ",
        },
        defaultDate: dateRange,
        onChange: (selectedDates, dateStr, instance) => {
          if (config) {
            if (dateStr) {
              if (mode === "range" && selectedDates.length < 2) {
                setValue(config.name, null)
                setError(config.name, { type: "required" })
              } else {
                setValue(config.name, selectedDates)
              }
            } else {
              setValue(config.name, null)
              setError(config.name, { type: "required" })
            }
            config.onChange({ target: inputRef.current })
          }
          
          if (onChange) {
            onChange({value: selectedDates, dateString: dateStr, instance})
          }
        },
      })
    }
  }, [])

  useEffect(() => {
    if (!inputRef.current?.value && dateRange && flatpickrInstance.current) {
      flatpickrInstance.current.setDate(dateRange, true)
    }
  }, [dateRange])

  return (
    <span>
      {label && (
        <label
          htmlFor={config?.name || name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}{" "}
          {showOptionalLabel && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <input
        {...config}
        type="text"
        ref={inputRef}
        id={config?.name || name}
        placeholder={placeholder}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className="relative text-[13px] rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px]"
      />
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
    </span>
  )
}

export default DateInput

DateInput.defaultProps = {
  mode: "single",
  dateFormat: "M j, Y",
}

type DateInputProps = {
  config?: UseFormRegisterReturn
  label?: string
  error?: FieldError
  placeholder?: string
  showOptionalLabel?: boolean
  mode?: "single" | "multiple" | "range" | "time"
  minDate?: string | Date
  dateFormat?: string
  enableTime?: boolean
  value?: IDate | null | undefined
  onChange?: (event: DateChangeEvent) => void
  name?: string
  rules?: RegisterOptions
  controlled?: boolean
}

type DateChangeEvent = {
  value: IDate | null | undefined
  dateString: string
  instance: Flatpickr
}

type IDate = Array<Date | string>