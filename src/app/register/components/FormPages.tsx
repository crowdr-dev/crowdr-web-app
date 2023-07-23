import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";

import Intro from "./Intro";
import AccountDetails from "./AccountDetails";
import OrganizationDetails from "./OrganizationDetails";
import Confirmation from "./Confirmation";

const FormPages = () => {
  const { formPage, handleSubmit } = useFormContext() as RegisterFormContext;
  const submit = (data: any) => {console.log("SUBMITTED", data)}

  return (
    <form onSubmit={handleSubmit(submit)}>
      {formPage == "intro" && <Intro />}
      {formPage == "account" && <AccountDetails />}
      {formPage == "organization" && <OrganizationDetails />}
      {formPage == "confirm" && <Confirmation />}
    </form>
  );
};

export default FormPages;
