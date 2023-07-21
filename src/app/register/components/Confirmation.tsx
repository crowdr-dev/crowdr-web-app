const Confirmation = () => {
    return (
<section>
      <div className="max-w-[525px] mx-auto py-2">
        <div className="flex flex-col py-[21px] md:py-[56px] px-5">
          <h1 className="text-center text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
            Almost there...
          </h1>
            <h2 className="text-center text-[#0B5351] text-[14px] md:text-[20px] md:font-[600] mb-[15px]">
                Please check your inbox and click the confirmation link to activate your account.
            </h2>

          <div className="max-w-[473px]">
              <div id="fullname" className="flex flex-col mb-[9px]">
                  <label htmlFor="fullname" className="text-[14px] text-[#344054] mb-[6px]">Full name</label>
                  <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
              </div>



              <button className="bg-[#068645] opacity-50 text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]">Resend confirmation email</button>
          </div>
        </div>
      </div>
    </section>
    );
}

export default Confirmation;