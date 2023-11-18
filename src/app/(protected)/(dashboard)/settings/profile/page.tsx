import img from "../../assets/img.jpg";
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
