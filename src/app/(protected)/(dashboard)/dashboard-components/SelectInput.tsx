import Select from "react-select";
import { FieldError, Controller, Control } from "react-hook-form";
import { RFC } from "@/types/Component";

const SelectInput: RFC<SelectInputProps> = ({
  options,
  control,
  name,
  label,
  error,
  validation,
  placeholder,
  optional,
}) => {
  return (
    <span>
      {label && (
        <label htmlFor={name} className="text-[14px] text-[#344054] mb-[6px]">
          {label}{" "}
          {optional && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field: { onChange, value } }) => (
          <Select
            id={name}
            options={options}
            defaultValue={options[0]}
            isClearable={false}
            isSearchable={false}
            value={options.find((g) => g.value === value)}
            onChange={(g) => onChange(g!.value)}
            styles={{ control: (baseStyles, state) => ({...baseStyles, fontSize: 15, borderRadius: 8, borderColor: '#D0D5DD', boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)", padding: 4}) }}
          />
        )}
      />
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}
    </span>
  );
};

export default SelectInput;

type SelectInputProps = {
  options: readonly Option[];
  control: Control<any, any>;
  name: string;
  label?: string;
  error?: FieldError;
  validation?: any;
  placeholder?: string;
  optional?: boolean;
};

interface Option {
  value: string;
  label: string;
}
