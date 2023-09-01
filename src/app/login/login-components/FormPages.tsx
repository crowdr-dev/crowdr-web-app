import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
import axios from "axios";
import { API_BASE_URL } from "@/config";

import LoginFormContext, { FormFields } from "../../../hooks/useLoginForm";
import SignIn from "./SignIn";
import { setDataInLocalStorage } from "@/utils/localStorageData";

const FormPages = () => {
  const {
    formPage,
    handleSubmit,
  } = useFormContext() as LoginFormContext;
  const router = useRouter()

  const submit = async (formFields: FormFields) => {
    const endpoint = API_BASE_URL + "/api/v1/users/signin";
    let payload = _.pick(formFields, ["email", "password"]);

    try {
      const res = await axios.post(endpoint, payload);
      const { token, userType, organizationId } = res.data.data;
      setDataInLocalStorage("token", token)

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
        <SignIn />
      </form>
    </>
  );
};

export default FormPages;
