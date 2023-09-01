import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";
import { API_BASE_URL } from "@/config";
import _ from "lodash";
import axios from "axios";

import LoginFormContext, { FormFields } from "../../../hooks/useLoginForm";
import SignIn from "./SignIn";
import useToast from "@/hooks/useToast";

const FormPages = () => {
  const {
    formPage,
    handleSubmit,
    control,
    formState: { errors }
  } = useFormContext() as LoginFormContext;

  const submit = async (formFields: FormFields) => {
    const endpoint = API_BASE_URL + "/api/v1/users/signin";
    let payload = _.pick(formFields, ["email", "password"]);

    try {
      const res = await axios.post(endpoint, payload);
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <SignIn />
      </form>
    </>
  );
};

export default FormPages;
