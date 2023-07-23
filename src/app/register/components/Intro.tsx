import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";

const Intro = () => {
  const { setFormPage, register } = useFormContext() as RegisterFormContext;

  return (
    <section>
      <div className="max-w-[525px] mx-auto py-2">
        <div className="flex flex-col py-[21px] md:py-[56px] px-5">
          <h1 className="text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
            Start your <span className="text-[#FF5200]">Crowdr</span> adventure
            now!
          </h1>

          <div className="max-w-[473px]">
              <h2 className="text-[#0B5351] text-[14px] md:text-[20px] md:font-[600] mb-[15px]">
                Who are you?
              </h2>
              <div id="account_type">
                <label htmlFor="non_profit" className="block bg-[#068645] rounded-[8px] py-[18px] px-[20px] mb-[11px]">
                    <p className="text-white text-[14px] md:text-base font-[600] mb-2">Non-Profit</p>
                    <p className="text-white text-[13px] font-[300] hidden md:block">Select this If you're a non-profit organization.</p>
                    <p className="text-white text-[12px] font-[300] md:hidden">Select this If you're a non-profit organization looking to raise funds for your cause.</p>
                  <input type="radio" {...register("accountType")} id="non_profit" value="non_profit" className="hidden" />
                </label>
                <label htmlFor="individual" className="block bg-[#F8F8F8] rounded-[8px] py-[18px] px-[20px]">
                    <p className="text-[#344054] text-[14px] md:text-base font-[600] mb-2">Individual</p>
                    <p className="text-[#667085] text-[12px] md:text-[13px] font-[300]">Select this if you’re a person looking to volunteer, donate or raise funds.</p>
                  <input type="radio" {...register("accountType")} id="individual" value="individual" className="hidden" />
                </label>
              </div>

              <h2 className="text-[#0B5351] text-[20px] font-[600] my-[15px] hidden md:block">
                What are you primarily interested in?
              </h2>
              <h2 className="text-[#0B5351] text-[14px] font-[400] my-[18px] md:hidden">
                Which industry are you primarily interested in?
              </h2>
              <div id="interests" className="flex flex-wrap gap-y-[10px] mb-[37px] -mr-[6px]">
                {interests.map(({id, label, icon}) => (
                    <label key={id} htmlFor={id} className="flex justify-center items-center gap-x-[5px] bg-[#F8F8F8] rounded-full py-[8px] px-[21px] mr-[6px]">
                        {icon && <Image src={`images/emoji/${icon}.svg`} alt={icon} width={15} height={15} className="w-[10px] md:w-[15px]" />}
                        <span className="text-[#0B5351] text-[12px] md:text-base">{label}</span>
                    <input type="checkbox" {...register("interests")} id={id} value={id} className="hidden" />
                </label>
                ))}
              </div>

              <button type="button" onClick={() => setFormPage("account")} className="bg-[#068645] opacity-50 text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px]">Continue</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

const interests = [
    {
        id: 'business',
        label: 'Business',
        icon: 'toolbox'
    },
    {
        id: 'tech',
        label: 'Tech',
        icon: 'desktop-computer'
    },
    {
        id: 'health',
        label: 'Health',
        icon: 'syringe'
    },
    {
        id: 'music',
        label: 'Music',
        icon: 'guitar'
    },
    {
        id: 'legal',
        label: 'Legal',
        icon: 'balance-scale'
    },
    {
        id: 'family',
        label: 'Family',
        icon: 'family-man-woman-girl-boy'
    },
    {
        id: 'events',
        label: 'Events',
        icon: 'circus-tent'
    },
    {
        id: 'arts',
        label: 'Arts',
        icon: 'artist-palette'
    },
    {
        id: 'politics',
        label: 'Politics',
        icon: 'office-building'
    },
    {
        id: 'sports',
        label: 'Sports',
        icon: 'man-swimming-light-skin-tone'
    },
    {
        id: 'education',
        label: 'Education',
        icon: 'books'
    },
    {
        id: 'others',
        label: 'Others',
    },
]
