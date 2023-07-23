import { createContext, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types";

// const FormContext = createContext<RegisterFormContext>({
//   formPage: "intro",
// });

const RegisterFormContext: React.FC<RegisterFormProps> = ({ children }) => {
  const formContext: RegisterFormContext = { formPage: "intro", ...useForm() };

  return <FormProvider {...formContext}>{children}</FormProvider>;
};

export default RegisterFormContext;

// const useRegisterForm = () => {
//   return useContext(FormContext);
// };

interface RegisterFormProps {
  children: React.ReactNode;
}

export interface RegisterFormContext extends UseFormReturn {
  formPage: "intro" | "account" | "organization" | "confirm";
}
