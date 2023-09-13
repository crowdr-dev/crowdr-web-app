"use client";
import RegisterFormContext from "@/app/(auth)/signup/utils/useRegisterForm";
import Topbar from "./signup-components/Topbar";
import FormPages from "./signup-components/FormPages";

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
