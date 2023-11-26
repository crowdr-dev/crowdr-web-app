import { RFC } from "@/app/common/types";
import CurrencyInput from "react-currency-input-field";
import {
  useFormContext,
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

const NumberInput: RFC<NumberInputProps> = ({
  config,
  label,
  error,
  placeholder,
  showOptionalLabel,
  prefix,
  suffix,
}) => {
  const { setValue, trigger, getValues } = useFormContext();
  const regex = /[^0-9.]/gi;

  const handleInput = (e: InputEvent) => {
    const currentInput = getValues(config.name);

    if (isChangeEvent(e)) {
      let value = e.target.value.replace(regex, "");
      // console.log({value, currentInput: getValues(config.name)})
      if (value.endsWith('.')) value += '0'
      setValue(config.name, value ? Number(value) : undefined);
      trigger(config.name);
      // console.log({value, currentInput: getValues(config.name)})
    } else if (isKeyboardEvent(e)) {
      if (e.ctrlKey) {
      } else if (e.key == ".") {
        if (currentInput.includes(".")) e.preventDefault();
        else if (currentInput.length == 0) e.preventDefault();
      } else if (e.key.match(/^[^0-9.]$/i)) {
        e.preventDefault();
      }
    } else {
      // TODO: HANDLE CASE WITH PASTED TEXT
      const pastedText = e.clipboardData.getData("text");
      // console.log("Pasted text:", pastedText);
    }
  };

  const isChangeEvent = (
    e: InputEvent
  ): e is React.ChangeEvent<HTMLInputElement> => {
    if (e.type == "change") return true;
    else return false;
  };

  const isKeyboardEvent = (e: InputEvent): e is React.KeyboardEvent => {
    if (e.type.startsWith("key")) return true;
    else return false;
  };

  return (
    <span>
      {label && (
        <label
          htmlFor={config.name}
          className="text-[14px] text-[#344054] mb-[6px]"
        >
          {label}{" "}
          {showOptionalLabel && <span className="opacity-[0.44]">(Optional)</span>}
        </label>
      )}
      <CurrencyInput
        placeholder={placeholder}
        decimalsLimit={2}
        onChange={handleInput}
        onKeyDown={handleInput}
        onPaste={handleInput}
        prefix={prefix}
        value={getValues(config.name)}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className="text-[13px] rounded-lg border border-[#D0D5DD] w-full py-[10px] px-[14px]"
      />
      <input
        {...config}
        type="number"
        id={config.name}
        value={getValues(config.name)}
        className="hidden"
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
  prefix: "",
  suffix: "",
};

type NumberInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  showOptionalLabel?: boolean;
};

type InputEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent
  | React.ClipboardEvent;
