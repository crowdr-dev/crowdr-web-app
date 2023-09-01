import { useFormContext } from "react-hook-form";
import { API_BASE_URL } from "@/config";
import _ from "lodash";
import axios from "axios";
import LoginFormContext, { FormFields } from "../../../hooks/useLoginForm";
import ForgotPassword from "./ForgotPassword";
import useToast from "@/hooks/useToast";

const FormPages = () => {
    const {
        formPage,
        handleSubmit,
        control,
        formState: { errors }
    } = useFormContext() as LoginFormContext;

    const toast = useToast();
    const submit = async (formFields: FormFields) => {
        const endpoint = API_BASE_URL + "/api/v1/users/forgot-password";
        let payload = _.pick(formFields, ["email"]);

        try {
            const res = await axios.post(endpoint, payload);
            console.log("res")
            // toast(
            //     {
            //         title: "success", body: "hello", type: "success"
            //     }
            // )
        } catch (error) { }
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
