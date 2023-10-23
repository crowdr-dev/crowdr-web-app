import { useEffect, useRef } from "react";
// TODO: POSSIBLY SWITCH TO react-flatpickr
import flatpickr from "flatpickr";
import { useFormContext, FieldError, UseFormRegisterReturn } from "react-hook-form";
import { RFC } from "@/types/Component";

import "flatpickr/dist/flatpickr.min.css";

const DateInput: RFC<DateInputProps> = ({
  config,
  label,
  error,
  placeholder,
  optional,
  mode,
  dateFormat,
  enableTime,
  minDate,
}) => {
  const {setValue, setError} = useFormContext()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      flatpickr(inputRef.current, {
        mode,
        dateFormat,
        enableTime,
        minDate,
        static: true,
        locale: {
          rangeSeparator: " — "
        },
        onChange: (selectedDates, dateStr, instance) => {
          if (dateStr) {
            setValue(config.name, selectedDates)
          } else {
            setValue(config.name, null)
            setError(config.name, {type: 'required'})
          }
          config.onChange({target: inputRef.current})
        },
      });
    }
  }, []);

  return (
    <span>
      {label && (
        <label
          htmlFor={config.name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}{" "}
          {optional && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <input
        {...config}
        type="text"
        ref={inputRef}
        id={config.name}
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
  );
};

export default DateInput;

DateInput.defaultProps = {
  mode: 'single',
  dateFormat: 'M j, Y',
}

type DateInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  optional?: boolean;
  mode?: "single" | "multiple" | "range" | "time"
  minDate?: string | Date
  dateFormat?: string
  enableTime?: boolean
};
