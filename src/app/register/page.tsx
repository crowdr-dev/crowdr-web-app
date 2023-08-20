"use client";
import RegisterFormContext from "@/app/register/utils/useRegisterForm";
import Topbar from "./components/Topbar";
import FormPages from "./components/FormPages";

const Register = () => {
  return (
    <div>
      <Topbar />
      <RegisterFormContext>
        <FormPages />
      </RegisterFormContext>
    </div>
  );
};

export default Register;
