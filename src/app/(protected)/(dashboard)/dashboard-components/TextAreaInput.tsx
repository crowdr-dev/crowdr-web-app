import { useEffect } from "react";
import {Control, FieldError, UseFormRegisterReturn, useFormContext, useWatch} from "react-hook-form"
import { RFC } from "@/app/common/types/Component";

const TextAreaInput: RFC<TextAreaInputProps> = ({ config, label, error, control, placeholder, characterLimit, optional, ariaLabelledBy }) => {
  const {setValue} = useFormContext()
  const [inputContent] = useWatch({control, name: [config.name]})
  const showCharactersLeft = characterLimit && inputContent?.length > 0
  const charactersLeft = characterLimit! - inputContent?.length

  useEffect(() => {
    // FIXME: CHARACTER LIMIT MECHANISM BUGGY
    if (characterLimit && charactersLeft < 0) {
      setValue(config.name, inputContent.slice(0, characterLimit))
    }
  }, [charactersLeft])

  return (
    <span>
      {label && (
        <label
          htmlFor={config.name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}  {optional && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <textarea
        {...config}
        id={config.name}
        placeholder={placeholder}
        rows={5}
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
  );
}

export default TextAreaInput;

type TextAreaInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: FieldError
  placeholder?: string
  optional?: boolean
  characterLimit?: number
  control?: Control<any, any>;
  ariaLabelledBy?: string
}