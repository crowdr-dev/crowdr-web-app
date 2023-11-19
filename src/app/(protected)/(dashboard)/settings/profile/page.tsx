"use client";
import img from "../../../../../../public/images/donate.png";
import React, { useCallback } from "react";

const Profile = () => {
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
    <div className="w-[100%] h-[100vh] pl-[20px] pt-[10px]">
      <div className=" w-[60%]">
        <div className=" w-[100%] flex justify-between">
          <label className="flex flex-col w-[100%] justify-between">
            <span className="text-[black] font-medium mb-3">Name</span>
            <div className="flex justify-between w-[100%]">
              <input
                type="text"
                name="name"
                placeholder="Valerian"
                className="bg-tertiary py-[13px] w-[48%] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
              <input
                type="text"
                name="name"
                placeholder="Pedro"
                className="bg-tertiary py-[13px] w-[48%] px-6 placeholder:text-[#667085] text-[black] rounded-lg outline-none border-[1px] font-medium InputHold"
              />
            </div>
          </label>
        </div>

        <div className="mt-[25px]">
          <label className="flex flex-col">
            <span className="text-[black] font-medium mb-3">Email Address</span>
            <input
              type="text"
              name="name"
              placeholder="valerianpedro03@gmail.com"
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
              <img
                src={image}
                alt="User Avatar"
                className="w-[80%] h-[80%] rounded-[50%] object-cover"
              />
            ) : (
              <img
                src={img}
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
              or drag and drop <br /> SVG, PNG, JPG or GIF (max. 800x400px)
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
              Edit your public URL
            </span>
            <div className="flex items-center rounded-lg  ">
              <div className=" w-[25%] flex items-center justify-center  border-[1px] h-[52px] rounded-l-[10px]">
                app.crowdr.com/
              </div>
              <input
                type="text"
                placeholder="savethewhales"
                className="bg-tertiary py-[13px] w-[100%] px-4 placeholder:text-[#667085] text-[black] outline-none border-[1px] font-medium InputHold rounded-r-[10px]"></input>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
