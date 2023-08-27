import { useFormContext } from "react-hook-form";
// import { RegisterFormContext } from "@/hooks/useRegisterForm";
import { API_BASE_URL } from "@/config";
import _ from "lodash";
import axios from "axios";

import LoginFormContext, { FormFields } from "../../../hooks/useLoginForm";
import ForgotPassword from "./ForgotPassword";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";

const FormPages = () => {
  const {
    formPage,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext() as LoginFormContext;
  const router = useRouter()

  const submit = async (formFields: FormFields) => {
    const endpoint = API_BASE_URL + "/api/v1/users/signin";
    let payload = _.pick(formFields, ["email", "password"]);

    try {
      const res = await axios.post(endpoint, payload);
      const { token, userType, organizationId } = res.data.data;
      localStorage.setItem("token", token);
debugger
      if (userType == 'non-profit' && organizationId == null) {
        router.push('/register/organization')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {formPage === "login" && <SignIn />}
        {formPage === "forgot-password" && <ForgotPassword />}
        {formPage === "reset-password" && <ResetPassword />}
      </form>
    </>
  );
};

export default FormPages;
