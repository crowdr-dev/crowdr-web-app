import Image from "next/image";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/app/signup/utils/useRegisterForm";
import { API_BASE_URL } from "@/config";
import Email from "../../../../public/images/email.png"

const Confirmation = () => {
  const { userId } = useFormContext() as RegisterFormContext;
  const resendEmail = async () => {
    const params = {userId}
    const endpoint = API_BASE_URL + `api/v1/users/resend-verification-link?${new URLSearchParams(params)}`
    try {
      await axios.get(endpoint)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <div className="max-w-[525px] mx-auto py-2">
        <div className="flex flex-col py-[21px] md:py-[56px] px-5">
          <h1 className="text-center text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
            Almost there...
          </h1>
            <h2 className="text-center text-[#0B5351] text-[14px] md:text-[20px] mb-[40px] md:mb-[37px]">
                Please check your inbox and click the confirmation link to activate your account.
            </h2>

          <div className="max-w-[473px]">
              <div id="email_icon" className="flex justify-center items-center md:bg-[#F8F8F8] rounded-full h-[204px] w-[204px] mx-auto md:mb-[60px]">
                  <Image src={Email} alt="email icon" className="md:w-[90px]" />
              </div>

              <button onClick={() => resendEmail()} className="bg-[#068645] text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]">Resend confirmation email</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Confirmation;