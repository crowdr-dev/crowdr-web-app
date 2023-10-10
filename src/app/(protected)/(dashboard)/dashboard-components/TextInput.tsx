import { RFC } from "@/types/Component";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const TextInput: RFC<TextInputProps> = ({ config, label, error, placeholder, optional }) => {
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
      <input
        type="text"
        {...config}
        id={config.name}
        placeholder={placeholder}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className="text-[15px] rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px]"
      />
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
    </span>
  );
};

export default TextInput;

type TextInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: FieldError
  placeholder?: string
  optional?: boolean
};
