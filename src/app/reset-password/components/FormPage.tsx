import { useFormContext } from "react-hook-form";
import { API_BASE_URL } from "@/config";
import _ from "lodash";
import axios from "axios";
import LoginFormContext, { FormFields } from "../../../hooks/useLoginForm";
import ResetPassword from "./ResetPassword";
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
        const endpoint = API_BASE_URL + "/api/v1/users/reset-password";
        let payload = _.pick(formFields, ["password"]);

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
                <ResetPassword />
            </form>
        </>
    );
};

export default FormPages;
