"use-client";
import { Buttonprops } from "@/app/common/components/ButtonProps";
import React, { useCallback } from "react";
import Image from "next/image";

const Verification = () => {
  const [image, setImage] = React.useState<string | null>(null);

  const onHandleImages = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = e?.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

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
                type="text"
                placeholder="2939 Idoko Rd, Lekki Phase 1, Lagos NG 11011"
                className="bg-tertiary py-[13px] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
            </label>
          </div>

          <div
            className="mt-[20px] pt-[15px] flex items-center h-[150px] rounded-[15px] flex-col border-[1px]"
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <div className="h-[50px] w-[50px] flex justify-center items-center">
              {image ? (
                <Image
                  src={image}
                  alt="User Avatar"
                  className="w-[80%] h-[80%] rounded-[50%] object-cover"
                />
              ) : (
                <Image
                  alt=""
                  src="../../../../../../public/images/donate.png"
                  className="w-[80%] h-[80%] rounded-[50%] object-cover"
                />
              )}
            </div>

            <div className="text-center">
              <div className="text-[15px] leading-[25px]">
                <label
                  htmlFor="pics"
                  className="text-[#FF5200] text-[16px] cursor-pointer">
                  Click to upload
                </label>{" "}
                CAC certificate <br /> SVG, PNG, JPG or GIF (max. 800x400px)
              </div>
              <input
                type="file"
                id="pics"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => onHandleImages(e)}
                style={{ display: "none" }}
              />
            </div>
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
