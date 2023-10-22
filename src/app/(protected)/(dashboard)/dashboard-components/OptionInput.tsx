import { RFC } from "@/types/Component";
import { UseFormRegisterReturn } from "react-hook-form";

const OptionInput: RFC<OptionInputProps> = ({
  config,
  type,
  value,
  label,
  placeholder,
  className,
}) => {
  return (
    <label htmlFor={value} className="flex mb-3">
      <input
        {...config}
        type={type}
        value={value}
        id={config.name}
        className="rounded-md border border-[#D0D5DD] h-5 w-5 mr-3"
      />

      {label}
    </label>
  );
};

export default OptionInput;

type OptionInputProps = {
  config: UseFormRegisterReturn;
  type: "radio" | "checkbox";
  value: string;
  label: string;
  placeholder?: string;
  className?: string;
};
