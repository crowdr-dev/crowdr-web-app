import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";

const AccountDetails = () => {
  const {setFormPage, register, control, formState: {errors, isValid}} = useFormContext() as RegisterFormContext;
  const [accountType] =  useWatch({control, name: ["accountType"]})
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

    return (
  <section>
      <div className="max-w-[525px] mx-auto py-2">
        <div className="flex flex-col py-[21px] md:py-[56px] px-5">
          <h1 className="text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
            Welcome
          </h1>
            <h2 className="text-[#0B5351] text-[14px] md:text-[20px] md:font-[600] mb-[15px]">
                Proceed by providing these details.
            </h2>

          <div className="max-w-[473px]">
              {accountType == "individual" && <div className="flex flex-col mb-[9px]">
                  <label htmlFor="fullname" className="text-[14px] text-[#344054] mb-[6px]">Full name</label>
                  <input type="text" {...register("fullname", {required: {value: true, message: "Full name is required"}})} id="fullname" placeholder="Enter your full name" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.fullname && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.fullname?.message}</span>}
              </div>}

              {accountType == "non_profit" && <div className="flex flex-col mb-[9px]">
                  <label htmlFor="organization_name" className="text-[14px] text-[#344054] mb-[6px]">Organization name</label>
                  <input type="text" {...register("organizationName", {required: {value: true, message: "Organization name is required"}})} id="organization_name" placeholder="Enter your organization name" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.organizationName && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.organizationName?.message}</span>}
              </div>}

              <div className="flex flex-col mb-[9px]">
                  <label htmlFor="email_address" className="text-[14px] text-[#344054] mb-[6px]">Email address</label>
                  <input type="text" {...register("emailAddress", {required: {value: true, message: "Email is required"}, pattern: {value: emailRegex, message: "Enter a valid email"}})} id="email_address" placeholder="Enter your email" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.emailAddress && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.emailAddress?.message}</span>}
              </div>

              <div className="flex flex-col mb-[9px]">
                  <label htmlFor="password" className="text-[14px] text-[#344054] mb-[6px]">Password</label>
                  <input type="password" {...register("password", {required: {value: true, message: "Password is required"}, minLength: {value: 8, message: "Must be at least 8 characters."}})} id="password" placeholder="Create a password" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.password && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.password?.message}</span>}
              </div>

              <div className="flex flex-col mb-[9px]">
                  <label htmlFor="confirm_password" className="text-[14px] text-[#344054] mb-[6px]">Confirm Password*</label>
                  <input type="password" {...register("confirmPassword", {required: true, validate: {value: (confirmPassword, {password}) => confirmPassword === password || "Passwords do not match"}})} id="confirm_password" placeholder="Confirm password" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.confirmPassword && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.confirmPassword?.message}</span>}
              </div>

              {accountType == "individual" && <div className="flex flex-col mb-[9px]">
                  <label htmlFor="gender" className="text-[14px] text-[#344054] mb-[6px]">Gender</label>
                  <select {...register("gender", {required: {value: true, message: "Select an option"}})} id="gender" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.gender?.message}</span>}
              </div>}

              {accountType == "individual" && <div className="flex flex-col mb-[9px]">
                  <label htmlFor="referrer" className="text-[14px] text-[#344054] mb-[6px]">How did you hear about us? <span className="opacity-[0.44]">(Optional)</span></label>
                  <select {...register("referrer", {required: {value: true, message: "Select an option"}})} id="referrer" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                    <option value="google">Google</option>
                    <option value="facebook">Facebook</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.referrer && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.referrer?.message}</span>}
              </div>}

              <div className="flex gap-x-2 mb-[22px]">
                  <input type="checkbox" {...register("termsAccepted", {required: true})} id="terms_conditions" className="rounded-[4px] border border-[#D0D5DD] w-4 h-4" />
                  <p className="text-[14px] text-[#344054] font-[500]">
                    I have read, understood and I agree to <span className="text-[#003D66]">Crowdr’s</span> <Link href="/privacy-policy" className="underline">Privacy Policy</Link>,
                    and <Link href="/terms-and-conditions" className="underline">Terms and conditions</Link>.
                  </p>
              </div>

              <button type="button" onClick={() => setFormPage(accountType == "non_profit" ? "organization" : "confirm")} disabled={!isValid} className={`${isValid ? "opacity-100" :  "opacity-50"} bg-[#068645] cursor-pointer text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]`}>Continue</button>
              <button type="button" onClick={() => setFormPage("intro")} className="opacity-50 text-[#000] text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full px-[20px]">Go back</button>
          </div>
        </div>
      </div>
    </section>
    );
}

export default AccountDetails;