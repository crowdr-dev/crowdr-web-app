import { useFormContext } from "react-hook-form";
import _ from "lodash";
import axios from "axios";
import useToast from "@/hooks/useToast";
import {
  FormFields,
  RegisterFormContext,
} from "@/app/register/utils/useRegisterForm";
import { API_BASE_URL } from "@/config";

import Intro from "./Intro";
import AccountDetails from "./AccountDetails";
import Confirmation from "./Confirmation";

const FormPages = () => {
  const { formPage, setFormPage, setUserId, handleSubmit } =
    useFormContext() as RegisterFormContext;
  const toast = useToast();

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
      const {
        data: { data },
      } = await axios.post(endpoint, payload);
      setUserId(data._id);
      setFormPage("confirm");
    } catch (error: any) {
      const { message } = error.response.data;
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {formPage == "intro" && <Intro />}
      {formPage == "account" && <AccountDetails />}
      {formPage == "confirm" && <Confirmation />}
    </form>
  );
};

export default FormPages;
