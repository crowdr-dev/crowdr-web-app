import Image from "next/image";
import { RFC } from "@/app/common/types";

import { useFormContext } from "react-hook-form";


type InputProps = {
    label: string
    placeholder?: string
    name: string
    id?: string
}


const Input: RFC<InputProps> = (props) => {
    const { label, placeholder, name, id } = props
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    return (

        <div className="flex flex-col mb-[14px]">
            <label
                htmlFor={id}
                className="text-[14px] text-[#344054] mb-[6px]"
            >
                {label}
            </label>

            {
                name !== "email" ?
                    <input
                        type="text"
                        // {...register(name, {
                        //     required: {
                        //         value: true,
                        //         message: `${name} is required`,
                        //     },
                        // })}
                        id={id}
                        placeholder={placeholder}
                        className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                    />
                    :
                    <input
                        type="email"
                        // {...register(name, {
                        //     required: {
                        //         value: true,
                        //         message: "Email address is required",
                        //     },
                        //     pattern: {
                        //         value: emailRegex,
                        //         message: "Enter a valid email",
                        //     },
                        // })}
                        id={id}
                        placeholder={placeholder}
                        className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                    />

            }

        </div>
    );
};

export default Input;

