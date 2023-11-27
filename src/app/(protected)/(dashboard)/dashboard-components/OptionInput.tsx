import { RFC } from "@/app/common/types";
import { UseFormRegisterReturn } from "react-hook-form";

const OptionInput: RFC<OptionInputProps> = ({
  config,
  type,
  value,
  label,
  className,
  name,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (config) {
      config.onChange(e)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <label htmlFor={value} className="flex mb-3">
      <input
        {...config}
        type={type}
        value={value}
        id={config?.name || name}
        name={config?.name || name}
        onChange={handleChange}
        className="rounded-md border border-[#D0D5DD] h-5 w-5 mr-3"
      />

      {label}
    </label>
  );
};

export default OptionInput;

type OptionInputProps = {
  config?: UseFormRegisterReturn;
  type: "radio" | "checkbox";
  value: string;
  label?: string;
  className?: string;
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
};
