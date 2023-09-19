import { useFormContext } from "react-hook-form";
import _ from "lodash";
import LoginFormContext, { FormFields } from "@/app/common/hooks/useLoginForm";
import ForgotPassword from "./ForgotPassword";
import useToast from "@/app/common/hooks/useToast";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import makeRequest from "@/utils/makeRequest";

const FormPages = () => {
  const {
    handleSubmit,
  } = useFormContext() as LoginFormContext;

  const toast = useToast();
  const submit = async (formFields: FormFields) => {
    const endpoint = "/api/v1/users/forgot-password";
    let payload = JSON.stringify(_.pick(formFields, ["email"]));

    try {
      const { message } = await makeRequest<{ message: string }>(endpoint, {
        method: "POST",
        payload,
      });
      toast({ title: "Success!", body: message, type: "success" });
    } catch (error) {
      const message = extractErrorMessage(error);
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <ForgotPassword />
      </form>
    </>
  );
};

export default FormPages;