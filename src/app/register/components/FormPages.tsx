import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import { DevTool} from "@hookform/devtools"

import Intro from "./Intro";
import AccountDetails from "./AccountDetails";
import OrganizationDetails from "./OrganizationDetails";
import Confirmation from "./Confirmation";

const FormPages = () => {
  const { formPage, handleSubmit, control, formState: {errors} } = useFormContext() as RegisterFormContext;
  const submit = (data: any) => {console.log("SUBMITTED", data); console.log({errors})}

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {formPage == "intro" && <Intro />}
        {formPage == "account" && <AccountDetails />}
        {formPage == "organization" && <OrganizationDetails />}
        {formPage == "confirm" && <Confirmation />}
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormPages;
