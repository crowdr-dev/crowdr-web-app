import { useEffect, useState } from "react"
import {
  Control,
  FieldError,
  UseFormRegisterReturn,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { RFC } from "@/app/common/types"

const TextAreaInput: RFC<TextAreaInputProps> = ({
  config,
  label,
  error,
  control,
  placeholder,
  characterLimit,
  showOptionalLabel,
  ariaLabel,
  ariaLabelledBy,
  value,
  onChange,
  name,
}) => {
  const [charactersLeft, setCharactersLeft] = useState<number>()
  const [showCharactersLeft, setShowCharactersLeft] = useState<boolean>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaContent = e.target.value

    if (characterLimit) {
      let charactersLeft = characterLimit - textAreaContent.length
      if (charactersLeft < 0) {
        e.target.value = textAreaContent.slice(0, characterLimit)
        charactersLeft = characterLimit - e.target.value.length
      }
      
      setShowCharactersLeft(textAreaContent.length > 0 ? true : false)
      setCharactersLeft(charactersLeft)
      if (config) config.onChange(e)
      if (onChange) onChange(e)
    } else {
      if (config) config.onChange(e)
      if (onChange) onChange(e)
    }
  }

  return (
    <span>
      {label && (
        <label
          htmlFor={config?.name || name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}{" "}
          {showOptionalLabel && (
            <span className="opacity-[0.44]">(Optional)</span>
          )}
        </label>
      )}
      <textarea
        {...config}
        id={config?.name || name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={5}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className="text-[13px] resize-none rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px]"
      />
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
      {showCharactersLeft && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {charactersLeft} characters left
        </span>
      )}
    </span>
  )
}

export default TextAreaInput

type TextAreaInputProps = {
  config?: UseFormRegisterReturn
  label?: string
  error?: FieldError
  placeholder?: string
  showOptionalLabel?: boolean
  characterLimit?: number
  control?: Control<any, any>
  ariaLabelledBy?: string
  ariaLabel?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  name?: string
}
