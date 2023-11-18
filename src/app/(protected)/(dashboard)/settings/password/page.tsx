import dynamic from "next/dynamic";

const PasswordInput = dynamic(() => import("./PasswordInput"), { ssr: false });

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
  return (
    <div className="h-[80vh] mt-[20px] w-[60%] flex flex-col">
      <div className="flex items-center justify-between">
        <text className="text-[18px]">Current Password</text>
        <PasswordInput placeholder="Password" />
      </div>
      <hr className="mt-[15px] border-[#E4E7EC] mb-[15px]" />

      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between">
          <text className="text-[18px]">New Password</text>
          <div className="w-[70%] flex gap-[5px] flex-col">
            <PasswordInput placeholder="New Password" />
            <text>Your new password must be more than 8 characters.</text>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <text className="text-[18px]">Confirm New Password</text>
          <PasswordInput placeholder="Confirm New Password" />
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
