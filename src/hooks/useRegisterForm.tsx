import { useState, Dispatch, SetStateAction } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

const RegisterFormContext: RFC = ({ children }) => {
  const [formPage, setFormPage] = useState<FormPage>("intro")
  const formContext: RegisterFormContext = { formPage, setFormPage, ...useForm() };

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default RegisterFormContext;
export { RegisterFormContext }

type FormPage = "intro" | "account" | "organization" | "confirm"
type FormPageSetter = Dispatch<SetStateAction<FormPage>>
type RegisterFormProps = {children: React.ReactNode}
type RFC = React.FC<RegisterFormProps>
type RegisterFormContext = {
  formPage: FormPage
  setFormPage: FormPageSetter
} & UseFormReturn
