import { useFormContext } from "react-hook-form"

import { RFC } from "@/app/common/types"
import { FieldError, RegisterOptions, UseFormRegisterReturn } from "react-hook-form"

const TextInput: RFC<TextInputProps> = ({
  config,
  label,
  error,
  placeholder,
  showOptionalLabel,
  ariaLabelledBy,
  onChange,
  id,
  styles,
  value,
  name,
  rules,
  controlled,
  ariaLabel,
  ...props
}) => {
  if (!controlled && !config && name) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {register, formState: {errors}} = useFormContext()
    config = register(name, rules)
    error = errors[name] as FieldError
  }
  const inputStyle = props.icon ? "pl-9" : ""
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (config) {
      config.onChange(e)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <span className={styles?.wrapper}>
      {label && (
        <label
          htmlFor={id || config?.name || name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}{" "}
          {showOptionalLabel && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <div className="relative">
        {props.icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <props.icon className="text-[#667085]" />
          </div>
        )}
        <input
          type="text"
          {...config}
          id={id || config?.name || name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={inputStyle + " text-[13px] rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px] " + styles?.input}
        />
      </div>
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
    </span>
  )
}

export default TextInput

type TextInputProps = {
  config?: UseFormRegisterReturn
  label?: string
  error?: FieldError
  placeholder?: string
  showOptionalLabel?: boolean
  ariaLabel?: string
  ariaLabelledBy?: string
  icon?: any
  name?: string
  rules?: RegisterOptions
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  styles?: {
    wrapper?: string
    input?: string
  }
  controlled?: boolean
}
