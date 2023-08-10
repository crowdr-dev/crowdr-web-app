import NextImage from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import Select from 'react-select';
import UploadIcon from "../../../../public/svg/upload-cloud.svg"

const OrganisationDetails = () => {
  const { setFormPage, register, control, formState: {errors, isValid} } = useFormContext() as RegisterFormContext;
  const {onChange} = register("upload")

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
                <div className="mb-[20px]">
                  <label htmlFor="upload" className="flex flex-col items-center cursor-pointer rounded-lg border-[2px] border-dashed border-[#e4e7ec] py-4 px-6 mb-1">
                    <div className="bg-[#F2F4F7] rounded-full border-[6px] border-[#F9FAFB] p-[10px] mb-3">
                      <NextImage src={UploadIcon} alt="upload icon" width={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm mb-1"><span className="text-[#FF5200] hover:underline">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-[#667085]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                      <input type="file" {...register("upload", {required: {value: true, message: "Please upload an image"}, validate: { isCorrectSize: checkIfCorrectSize}})} id="upload" accept=".svg, .png, .jpg, .jpeg, .gif" className="hidden" />
                      {/* TODO: Implement drag-and-drop feature */}
                      {/* TODO: Make responsive to file drag-over and succesful upload */}
                  </label>
                  {errors.upload && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.upload?.message}</span>}
                </div>

                <div className="flex flex-col mb-[26px]">
                    <label htmlFor="cac_number" className="text-[14px] text-[#344054] mb-[6px]">CAC number</label>
                    <input type="text" {...register("cacNumber", {required: true, pattern: {value: /^\d+$/, message: "Enter a valid CAC number"}})} id="cac_number" placeholder="Enter your organization’s CAC number" className="text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                  {errors.cacNumber && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.cacNumber?.message}</span>}
                </div>
  
                <div className="flex flex-col mb-[26px]">
                    <label htmlFor="organization_location" className="text-[14px] text-[#344054] mb-[6px]">Where is your org<span className="hidden md:inline">anization</span> located?</label>
                    <Controller name="organizationLocation" control={control} rules={{ required: {value: true, message: "Select an option"} }} render={({field: {onChange, value}}) => (<Select id="organization_location" options={stateOptions} isSearchable={true} isClearable={false} value={stateOptions.find(g => g.value === value)} onChange={(g) => onChange(g!.value)} />)} />
                  {errors.organizationLocation && <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">{errors.organizationLocation?.message}</span>}
                </div>

                <div className="flex flex-col mb-[40px]">
                    <label htmlFor="public_url" className="text-[14px] text-[#344054] mb-[6px] hidden md:block">Create your public URL</label>
                    <label htmlFor="public_url" className="text-[14px] text-[#344054] mb-[6px] md:hidden">Create organization public link</label>
                    <div className="grid grid-cols-[146px_minmax(0,_1fr)]">
                      <input placeholder="app.crowdr.com/" disabled className="placeholder:text-[#667085] bg-white rounded-tl-lg rounded-bl-lg border border-[#D0D5DD] border-r-0 py-[10px] pl-[14px]" />
                      <input type="text" {...register("publicUrl", {required: true})} id="public_url" className="text-[15px] rounded-tr-lg rounded-br-lg border border-[#D0D5DD] py-[10px] px-[14px]" />
                    </div>
                </div>
  
                <button type="button" onClick={() => setFormPage("confirm")} disabled={!isValid} className={`${isValid ? "opacity-100" :  "opacity-50"} bg-[#068645] cursor-pointer text-white text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full py-[12px] px-[20px] mb-[21px]`}>Continue</button>
                <button type="submit" className="opacity-50 text-[#000] text-[14px] md:text-base font-[400] md:font-[500] leading-[24px] rounded-[10px] w-full px-[20px]">Go back</button>
            </div>
          </div>
        </div>
      </section>
    );
}

export default OrganisationDetails;

const checkIfCorrectSize = async (fileList: any) => {
  const file = fileList[0]
  if (!file) return "Please select an image"

  const imageStatus = await new Promise<string | boolean>((resolve) => {
    const img = new Image()
    img.onload = () => {
      if (img.width > 800 || img.height > 400) {
        console.log({width: img.width, height: img.height})
        resolve("Image must not be larger than 800x400px")
      } else {
        resolve(true)
      }
    }
  
    const reader = new FileReader()
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        img.src = e.target?.result
      }
    }
    reader.readAsDataURL(file)
  })

  return imageStatus
}

const stateOptions = [
  {value: 'Abia', label: 'Abia'},
  {value: 'Adamawa', label: 'Adamawa'},
  {value: 'Akwa Ibom', label: 'Akwa Ibom'},
  {value: 'Anambra', label: 'Anambra'},
  {value: 'Bauchi', label: 'Bauchi'},
  {value: 'Bayelsa', label: 'Bayelsa'},
  {value: 'Benue', label: 'Benue'},
  {value: 'Borno', label: 'Borno'},
  {value: 'Cross River', label: 'Cross River'},
  {value: 'Delta', label: 'Delta'},
  {value: 'Ebonyi', label: 'Ebonyi'},
  {value: 'Edo', label: 'Edo'},
  {value: 'Ekiti', label: 'Ekiti'},
  {value: 'Enugu', label: 'Enugu'},
  {value: 'Gombe', label: 'Gombe'},
  {value: 'Imo', label: 'Imo'},
  {value: 'Jigawa', label: 'Jigawa'},
  {value: 'Kaduna', label: 'Kaduna'},
  {value: 'Kano', label: 'Kano'},
  {value: 'Katsina', label: 'Katsina'},
  {value: 'Kebbi', label: 'Kebbi'},
  {value: 'Kogi', label: 'Kogi'},
  {value: 'Kwara', label: 'Kwara'},
  {value: 'Lagos', label: 'Lagos'},
  {value: 'Nasarawa', label: 'Nasarawa'},
  {value: 'Niger', label: 'Niger'},
  {value: 'Ogun', label: 'Ogun'},
  {value: 'Ondo', label: 'Ondo'},
  {value: 'Osun', label: 'Osun'},
  {value: 'Oyo', label: 'Oyo'},
  {value: 'Plateau', label: 'Plateau'},
  {value: 'Rivers', label: 'Rivers'},
  {value: 'Sokoto', label: 'Sokoto'},
  {value: 'Taraba', label: 'Taraba'},
  {value: 'Yobe', label: 'Yobe'},
  {value: 'Zamfara', label: 'Zamfara'},
  {value: 'FCT', label: 'FCT'},
]