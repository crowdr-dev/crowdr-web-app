import { Buttonprops } from "@/app/common/components/ButtonProps";

const Verification = () => {
  return (
    <div>
      <div className="w-[100%] pb-20 pt-[10px]">
        <div className=" w-[60%]">
          <div className="mt-[25px]">
            <label className="flex flex-col">
              <span className="text-[black] font-medium mb-3">CAC Number</span>
              <input
                type="number"
                placeholder="2108051917"
                className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
            </label>
          </div>

          <div className="mt-[25px]">
            <label className="flex flex-col">
              <span className="text-[black] font-medium mb-3">
                Phone Number
              </span>
              <input
                type="number"
                name="name"
                placeholder="+234"
                className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
            </label>
          </div>

          <div className="mt-[25px]">
            <label className="flex flex-col">
              <span className="text-[black] font-medium mb-3">
                Where is your organisation located
              </span>
              <select
                placeholder="2108051917"
                className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                <option className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                  Lagos
                </option>
                <option className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                  Abuja
                </option>
                <option className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                  Anambra
                </option>
                <option className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                  Kaduna
                </option>
                <option className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold">
                  Ogun
                </option>
              </select>
            </label>
          </div>

          <div className="mt-[25px]">
            <label className="flex flex-col">
              <span className="text-[black] font-medium mb-3">
                Full Address
              </span>
              <input
                type="number"
                placeholder="2108051917"
                className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
            </label>
          </div>

          <div className="w-[100%] flex items-center justify-end mt-[30px]">
            <div className=" w-[90%] flex items-center justify-end gap-[20px]">
              <Buttonprops
                text="Cancel"
                bgColor="bg-white"
                width="w-[100px]"
                color="text-[black]"
                border="border-[1px]"
              />
              <Buttonprops
                text="Save Changes"
                bgColor="bg-[green]"
                width="w-[150px]"
                color="text-[white]"
                border=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
