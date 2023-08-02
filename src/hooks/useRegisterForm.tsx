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

const config: UseFormConfig = {
  defaultValues: {
    accountType: "non_profit",
    interests: [],
    fullname: "",
    organizationName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    gender: "",
    referrer: "google",
    termsAccepted: false,
    cacNumber: "",
    organizationLocation: "",
    publicUrl: ""
  },
  mode: 'onChange'
}

type FormPage = "intro" | "account" | "organization" | "confirm"
type FormPageSetter = Dispatch<SetStateAction<FormPage>>
type RegisterFormProps = {children: React.ReactNode}
type RFC = React.FC<RegisterFormProps>
type UseFormConfig = Parameters<typeof useForm<FormFields>>[0]
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
  upload:               string;
  cacNumber:            string;
  organizationLocation: string;
  publicUrl:            string;
}
type RegisterFormContext = {
  formPage: FormPage
  setFormPage: FormPageSetter
} & UseFormReturn<FormFields>
