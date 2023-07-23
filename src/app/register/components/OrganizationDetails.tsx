import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import UploadIcon from "../../../../public/svg/upload-cloud.svg"

const OrganisationDetails = () => {
  const { setFormPage, register } = useFormContext() as RegisterFormContext;

    return (
        <section>
        <div className="max-w-[346px] mx-auto py-2">
          <div className="flex flex-col py-[21px] md:py-[56px] px-5">
            <h1 className="text-[#0B5351] text-[18px] md:text-[32px] font-[600] mb-[8px] md:mb-[15px]">
                It’s Go Time
            </h1>
              <h2 className="text-[#0B5351] text-[14px] md:text-[20px] mb-[15px]">
                Setup your profile
              </h2>
  
            <div className="max-w-[346px]">
                <div id="upload" className="flex flex-col items-center rounded-lg border-[2px] border-dashed border-[#e4e7ec] py-4 px-6 mb-[20px]">
                  <div className="bg-[#F2F4F7] rounded-full border-[6px] border-[#F9FAFB] p-[10px] mb-3">
                    <Image src={UploadIcon} alt="upload icon" width={24} />
                  </div>

                  <div className="text-center">
                    <p className="text-sm mb-1"><span className="text-[#FF5200]">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-[#667085]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                    {/* <label htmlFor="upload" className="text-[14px] text-[#344054] mb-[6px]">CAC number</label>
                    <input type="file" id="upload" name="upload" placeholder="Enter your organization’s CAC number" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" /> */}
                    {/* TODO: Implement drag-and-drop feature */}
                    {/* TODO: Add validation */}
                    {/* TODO: Make cursor on buttons pointer */}
                </div>

                <div className="flex flex-col mb-[26px]">
                    <label htmlFor="cac_number" className="text-[14px] text-[#344054] mb-[6px]">CAC number</label>
                    <input type="text" {...register("cacNumber")} id="cac_number" placeholder="Enter your organization’s CAC number" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                </div>
  
                <div className="flex flex-col mb-[26px]">
                    <label htmlFor="organization_location" className="text-[14px] text-[#344054] mb-[6px]">Where is your org<span className="hidden md:inline">anization</span> located?</label>
                    <select {...register("organizationLocation")} id="organization_location" defaultValue="Select state" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]">
                      <option disabled>Select state</option>
                      <option value="abia">Abia</option>
                      <option value="adamawa">Adamawa</option>
                    </select>
                </div>

                <div className="flex flex-col mb-[40px]">
                    <label htmlFor="public_url" className="text-[14px] text-[#344054] mb-[6px] hidden md:block">Create your public URL</label>
                    <label htmlFor="public_url" className="text-[14px] text-[#344054] mb-[6px] md:hidden">Create organization public link</label>
                    <div className="grid grid-cols-[146px_minmax(0,_1fr)]">
                      <input placeholder="app.crowdr.com/" disabled className="placeholder:text-[#667085] bg-white rounded-tl-lg rounded-bl-lg border border-[#D0D5DD] border-r-0 py-[10px] pl-[14px]" />
                      <input type="text" {...register("publicUrl")} id="public_url" className="text-[15px] rounded-tr-lg rounded-br-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                    </div>
                </div>
  
                <button type="button" onClick={() => setFormPage("confirm")} className="bg-[#068645] opacity-50 text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]">Continue</button>
                <button type="submit" className="opacity-50 text-[#000] text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full px-[20px]">Go back</button>
            </div>
          </div>
        </div>
      </section>
    );
}

export default OrganisationDetails;