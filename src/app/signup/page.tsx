"use client";
import RegisterFormContext from "@/hooks/useRegisterForm";
import Topbar from "./signup-components/Topbar";
import FormPages from "./signup-components/FormPages";

const AboutUs = () => {
  return (
    <div>
      <Topbar />
      <RegisterFormContext>
        <FormPages />
      </RegisterFormContext>
    </div>
  );
};

export default AboutUs;
