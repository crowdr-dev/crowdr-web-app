import Link from "next/link";

const AccountDetails = () => {
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
              <div id="fullname" className="flex flex-col mb-[9px]">
                  <label htmlFor="fullname" className="text-[14px] text-[#344054] mb-[6px]">Full name</label>
                  <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
              </div>

              <div id="organization_name" className="flex flex-col mb-[9px]">
                  <label htmlFor="organization_name" className="text-[14px] text-[#344054] mb-[6px]">Organization name</label>
                  <input type="text" id="organization_name" name="organization_name" placeholder="Enter your organization name" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
              </div>

              <div id="email_address" className="flex flex-col mb-[9px]">
                  <label htmlFor="email_address" className="text-[14px] text-[#344054] mb-[6px]">Email address</label>
                  <input type="text" id="email_address" name="email_address" placeholder="Enter your email" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
              </div>

              <div id="password" className="flex flex-col mb-[9px]">
                  <label htmlFor="password" className="text-[14px] text-[#344054] mb-[6px]">Password</label>
                  <input type="text" id="password" name="password" placeholder="Create a password" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">Must be at least 8 characters.</span>
              </div>

              <div id="confirm_password" className="flex flex-col mb-[9px]">
                  <label htmlFor="confirm_password" className="text-[14px] text-[#344054] mb-[6px]">Confirm Password*</label>
                  <input type="text" id="confirm_password" name="confirm_password" placeholder="Confirm password" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
              </div>

              <div id="gender" className="flex flex-col mb-[9px]">
                  <label htmlFor="gender" className="text-[14px] text-[#344054] mb-[6px]">Gender</label>
                  <select name="gender" id="gender" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                    <option selected disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
              </div>

              <div id="referral" className="flex flex-col mb-[9px]">
                  <label htmlFor="referral" className="text-[14px] text-[#344054] mb-[6px]">How did you hear about us? <span className="opacity-[0.44]">(Optional)</span></label>
                  <select name="referral" id="referral" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                    <option value="google" selected>Google</option>
                  </select>
              </div>

              <div id="terms_conditions" className="flex gap-x-2 mb-[22px]">
                  <input type="checkbox" id="terms_conditions" name="terms_conditions" value="agree" className="rounded-[4px] border border-[#D0D5DD] w-4 h-4" />
                  <label htmlFor="terms_conditions" className="text-[14px] text-[#344054] font-[500]">I have read, understood and I agree to <span className="text-[#003D66]">Crowdr’s</span> <Link href="/privacy-policy" className="underline">Privacy Policy</Link>, and <Link href="terms-and-conditions" className="underline">Terms and conditions</Link>.</label>
              </div>

              <button className="bg-[#068645] opacity-50 text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]">Continue</button>
              <button className="opacity-50 text-[#000] text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full px-[20px]">Go back</button>
          </div>
        </div>
      </div>
    </section>
    );
}

export default AccountDetails;