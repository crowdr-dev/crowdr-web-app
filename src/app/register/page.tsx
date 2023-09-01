"use client";
import RegisterFormContext from "@/app/register/utils/useRegisterForm";
import Topbar from "./register-components/Topbar";
import FormPages from "./register-components/FormPages";

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
