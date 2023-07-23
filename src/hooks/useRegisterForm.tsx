import { useState, Dispatch, SetStateAction } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

const RegisterFormContext: RFC = ({ children }) => {
  const [formPage, setFormPage] = useState<FormPage>("intro")
  const formContext: RegisterFormContext = { formPage, setFormPage, ...useForm<FormFields>(config) };

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default RegisterFormContext;
export type { RegisterFormContext, FormFields }

const config = {
  defaultValues: {
    accountType: "non_profit"
  }
}

type FormPage = "intro" | "account" | "organization" | "confirm"
type FormPageSetter = Dispatch<SetStateAction<FormPage>>
type RegisterFormProps = {children: React.ReactNode}
type RFC = React.FC<RegisterFormProps>
type FormFields = {
  accountType:          string;
  interests:            string[];
  fullname:             string;
  organizationName:     string;
  emailAddress:         string;
  password:             string;
  confirmPassword:      string;
  gender:               string;
  referrer:             string;
  termsAccepted:        boolean;
  cacNumber:            string;
  organizationLocation: string;
  publicUrl:            string;
}
type RegisterFormContext = {
  formPage: FormPage
  setFormPage: FormPageSetter
} & UseFormReturn<FormFields>
