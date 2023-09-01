import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import { FormFields, LoginFormContext } from "../../../hooks/useLoginForm";
import { API_BASE_URL } from "@/config";
import _ from "lodash";
import axios from "axios";

const SignIn = () => {
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
            Login to your account
          </h1>
          <div className="max-w-[473px]">
            <div className="flex flex-col mb-[9px]">
              <label
                htmlFor="emailAddress"
                className="text-[14px] text-[#344054] mb-[6px]">
                Email address
              </label>
              <input
                type="text"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email address is required"
                  },
                  pattern: { value: emailRegex, message: "Enter a valid email" }
                })}
                id="fullname"
                placeholder="Enter your email"
                className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
              />
              {errors.email && (
                <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                  {errors.email?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col mb-[9px]">
              <label
                htmlFor="password"
                className="text-[14px] text-[#344054] mb-[6px]">
                Password
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
                placeholder="Enter your password"
                className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
              />
              {errors.password && (
                <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`${isValid ? "opacity-100" : "opacity-50"
                } bg-[#068645] cursor-pointer text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px] mt-[15px]`}>
              Login
            </button>
            <Link
              href={"forgot-password"}
              className="opacity-50 text-[#000] text-[16px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full px-[20px] text-center">
              Forgot password?
            </Link>

            <div className="bg-[#F8F8F8] py-[18px] px-[23px] mt-[13px] rounded-lg">
              <h2 className="text-[#344054]">Having problems logging in?</h2>
              <button className="underline text-[13px] text-[#667085]">
                Contact support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
