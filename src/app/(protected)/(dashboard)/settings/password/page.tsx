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
            className="cursor-pointer flex items-center justify-center w-[10%] h-[100%] text-[25px]"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
      </div>