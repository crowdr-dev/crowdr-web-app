import { useFormContext } from "react-hook-form";
import _ from "lodash";
import { FormFields, RegisterFormContext } from "@/hooks/useRegisterForm";
import { API_BASE_URL } from "@/config";

import Intro from "./Intro";
import AccountDetails from "./AccountDetails";
import OrganizationDetails from "./OrganizationDetails";
import Confirmation from "./Confirmation";
import axios from "axios";

const FormPages = () => {
  const { formPage, setFormPage, handleSubmit } =
    useFormContext() as RegisterFormContext;

  const submit = async (formFields: FormFields) => {
    const endpoint = API_BASE_URL + "/api/v1/users/signup";
    let payload = _.pick(formFields, [
      "userType",
      "email",
      "interests",
      "password",
      "referrer",
      "organizationName",
      "fullName",
      "gender",
    ]);

    try {
      const res = await axios.post(endpoint, payload);
      setFormPage('confirm');
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {formPage == "intro" && <Intro />}
        {formPage == "account" && <AccountDetails />}
        {formPage == "organization" && <OrganizationDetails />}
        {formPage == "confirm" && <Confirmation />}
      </form>
    </>
  );
};

export default FormPages;
