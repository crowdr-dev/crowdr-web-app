import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import { LoginFormContext } from '../../../hooks/useLoginForm';

const ResetPassword = () => {
    const {
        setFormPage,
        register,
        control,
        formState: { errors, isValid }
    } = useFormContext() as LoginFormContext;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    return (
        <section>
            <div className="max-w-[525px] mx-auto py-2">
                <div className="flex flex-col py-[21px] md:py-[56px] px-5">
                    <h1 className="text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
                        Reset Password
                    </h1>
                    <div className="max-w-[473px]">
                        <div className="flex flex-col mb-[9px]">
                            <label
                                htmlFor="password"
                                className="text-[14px] text-[#344054] mb-[6px]">
                                New Password
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: { value: true, message: "Password is required" },
                                    minLength: {
                                        value: 8,
                                        message: "Must be at least 8 characters."
                                    }
                                })}
                                id="password"
                                placeholder="Create a password"
                                className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                            />
                            {errors.password && (
                                <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                                    {errors.password?.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col mb-[9px]">
                            <label
                                htmlFor="password"
                                className="text-[14px] text-[#344054] mb-[6px]">
                               Confirm Password*
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: { value: true, message: "Password is required" },
                                    minLength: {
                                        value: 8,
                                        message: "Must be at least 8 characters."
                                    }
                                })}
                                id="password"
                                placeholder="Confirm password"
                                className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                            />
                            {errors.password && (
                                <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                                    {errors.password?.message}
                                </span>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => { }
                            }
                            disabled={!isValid}
                            className={`${isValid ? "opacity-100" : "opacity-50"
                                } bg-[#068645] cursor-pointer text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px] mt-[15px]`}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;
