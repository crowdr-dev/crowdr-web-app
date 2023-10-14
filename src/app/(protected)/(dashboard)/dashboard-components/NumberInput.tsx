import { RFC } from "@/types/Component";
import CurrencyInput from "react-currency-input-field";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

const NumberInput: RFC<NumberInputProps> = ({config, label, error, placeholder, optional, prefix, suffix}) => {
  // FIXME: STILL ABLE TO TYPE JUST A DOT OR MULTIPLE DOTS
  const regex = /[^0-9.]/gi

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
      <CurrencyInput
        {...config}
        id={config.name}
        placeholder={placeholder}
        decimalsLimit={2}
        onChange={e => {
          e.target.value = (e.target.value.replace(regex, ''))
          config.onChange(e)
        }}
        prefix={prefix}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className="text-[13px] rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px]"
      />
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
    </span>
  );
};

export default NumberInput;

NumberInput.defaultProps = {
  prefix: '',
  suffix: '',
}

type NumberInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: FieldError
  placeholder?: string
  prefix?: string
  suffix?: string
  optional?: boolean
};
