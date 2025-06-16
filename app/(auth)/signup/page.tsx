"use client";
import RegisterFormContext from "./utils/useRegisterForm";
import Topbar from "./signup-components/Topbar";
import FormPages from "./signup-components/FormPages";
import { useEffect } from "react";
import { Mixpanel } from "../../../utils/mixpanel";

const Register = () => {
  useEffect(() => {
    Mixpanel.track("Signup Page viewed");
  }, []);
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
