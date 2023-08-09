import { useFormContext } from "react-hook-form";
import { RegisterFormContext } from "@/hooks/useRegisterForm";

import LoginFormContext from '../../../hooks/useLoginForm';
import ForgotPassword from "./ForgotPassword";
import SignIn from "./SignIn"
import ResetPassword from "./ResetPassword";

const FormPages = () => {
    const { formPage, handleSubmit, control, formState: { errors } } = useFormContext() as LoginFormContext;
    const submit = (data: any) => { console.log("SUBMITTED", data); console.log({ errors }) }

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                {formPage === "login" && <SignIn />}
                {formPage === "forgot-password" && <ForgotPassword />}
                {formPage === "reset-password" && <ResetPassword/>}
            </form>
        </>
    );
};

export default FormPages;
