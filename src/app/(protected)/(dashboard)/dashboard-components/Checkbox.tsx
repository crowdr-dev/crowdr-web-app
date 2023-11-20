import Image from "next/image";
import { RFC } from "@/app/common/types";


type CheckboxProps = {
    label: string
    id?: string
}


const Checkbox: RFC<CheckboxProps> = (props) => {
    const { label, id } = props

    return (

        <div className="flex flex-row mb-[14px] items-baseline gap-[12px]">
            <input
                type="checkbox"
                id={id}
            />
            <label
                htmlFor={id}
                className="text-sm text-[#667085]"
            >
                {label}
            </label>

        </div>
    );
};

export default Checkbox;

