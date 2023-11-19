"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface ButtonProps {
  text: string;
  bgColor: string;
  width: string;
  color: string;
  border: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  bgColor,
  width,
  color,
  border,
}) => {
  const buttonClasses = `h-[35px] rounded-lg px-4 ${bgColor} ${width} ${color} ${border}`;
  return <button className={buttonClasses}>{text}</button>;
};

const Password: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="h-[80vh] mt-[20px] w-[60%] flex flex-col">
      <div className="flex  items-center justify-between">
        <text className="text-[18px]">Current Password</text>
        <div className="flex items-center w-[70%] border border-gray-400 h-[45px] mt-[20px] rounded">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-[100%] w-[100%]  pl-[15px] outline-none rounded"
          />
          <div
            onClick={togglePasswordVisibility}
            className="cursor-pointer flex items-center justify-center w-[10%] h-[100%] text-[25px]">
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
      </div>

      <hr className="mt-[15px] border-[#E4E7EC] mb-[15px]" />

      <div className="flex flex-col gap-[20px]">
        <div className="flex  items-center justify-between">
          <text className="text-[18px]">New Password</text>
          <div className="w-[70%] flex gap-[5px] flex-col">
            <div className="flex items-center w-[100%] border border-gray-400 h-[45px] mt-[20px] rounded">
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="New Password"
                className="h-[100%] w-[100%]  pl-[15px] outline-none  rounded"
              />
              <div
                onClick={togglePasswordVisibility2}
                className="cursor-pointer flex items-center justify-center w-[10%] h-[100%] text-[25px]">
                {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            <text>Your new password must be more than 8 characters.</text>
          </div>
        </div>

        <div className="flex  items-center justify-between">
          <text className="text-[18px]">Confirm New Password</text>
          <div className="flex items-center w-[70%] border border-gray-400 h-[45px] mt-[20px] rounded">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder=" Confirm New Password"
              className="h-[100%] w-[100%]  pl-[15px] outline-none  rounded"
            />
            <div
              onClick={togglePasswordVisibility2}
              className="cursor-pointer flex items-center justify-center w-[10%] h-[100%] text-[25px]">
              {showPassword2 ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] flex items-center justify-end mt-[30px]">
        <div className=" w-[90%] flex items-center justify-end gap-[20px]">
          <Button
            text="Cancel"
            bgColor="bg-white"
            width="w-[100px]"
            color="text-[black]"
            border="border-[1px]"
          />
          <Button
            text="Save Changes"
            bgColor="bg-[green]"
            width="w-[150px]"
            color="text-[white]"
            border=""
          />
        </div>
      </div>
    </div>
  );
};

export default Password;
