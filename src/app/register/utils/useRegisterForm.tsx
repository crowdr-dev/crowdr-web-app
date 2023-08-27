import { useState, Dispatch, SetStateAction } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

const RegisterFormContext: RFC = ({ children }) => {
  const [formPage, setFormPage] = useState<FormPage>("intro")
  const [userId, setUserId] = useState('')
  const formContext: RegisterFormContext = { formPage, setFormPage, userId, setUserId, ...useForm<FormFields>(config) };

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default RegisterFormContext;
export type { RegisterFormContext, FormFields }

const config: UseFormConfig = {
  defaultValues: {
    userType: "non-profit",
    interests: [],
    fullName: "",
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    referrer: "google",
    termsAccepted: false,
  },
  mode: 'onChange'
}

type FormPage = "intro" | "account" | "confirm"
type FormPageSetter = Dispatch<SetStateAction<FormPage>>
type RegisterFormProps = {children: React.ReactNode}
type RFC = React.FC<RegisterFormProps>
type UseFormConfig = Parameters<typeof useForm<FormFields>>[0]
type FormFields = {
  userType:             string;
  interests:            string[];
  fullName:             string;
  organizationName:     string;
  email:                string;
  password:             string;
  confirmPassword:      string;
  gender:               string;
  referrer:             string;
  termsAccepted:        boolean;
}
type RegisterFormContext = {
  formPage: FormPage
  setFormPage: FormPageSetter
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
} & UseFormReturn<FormFields>
