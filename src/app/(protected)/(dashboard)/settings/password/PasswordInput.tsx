// PasswordInput.tsx
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  placeholder: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center w-[100%] border border-gray-400 h-[45px] mt-[20px] rounded">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="h-[100%] w-[100%] pl-[15px] outline-none rounded"
      />
      <div
        onClick={togglePasswordVisibility}
        className="cursor-pointer flex items-center justify-center w-[10%] h-[100%] text-[25px]">
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </div>
    </div>
  );
};

export default PasswordInput;
