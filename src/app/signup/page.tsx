"use client";
import RegisterFormContext from "@/app/signup/utils/useRegisterForm";
import Topbar from "./components/Topbar";
import FormPages from "./components/FormPages";

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
