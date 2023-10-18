import Image from "next/image";
import { RFC } from "@/types/Component";


type SelectProps = {
    label: string
    name: string
    id?: string
    options: any[]
}


const Select: RFC<SelectProps> = (props) => {
    const { label, name, id, options } = props

    return (
        <div className="flex flex-col mb-[14px]">
            <label
                htmlFor={id}
                className="text-[14px] text-[#344054] mb-[6px]"
            >
                {label}
            </label>
            <select name={name} id={id} className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                {
                    options.map((option) => (
                        <option value={option.value} key={option.value}>{option.name}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default Select;

