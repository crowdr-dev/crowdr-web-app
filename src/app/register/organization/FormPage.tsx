"use client";
import { useRouter } from "next/navigation";
import axios, { toFormData } from "axios";
import { useFormContext } from "react-hook-form";
import {
  FormFields,
  OrganizationFormContext,
} from "@/app/register/utils/useOrganizatonForm";
import useToast from "@/hooks/useToast";
import { API_BASE_URL } from "@/config";

import OrganizationDetails from "../register-components/OrganizationDetails";

const FormPage = () => {
  const { handleSubmit } = useFormContext() as OrganizationFormContext;
  const router = useRouter();
  const toast = useToast();

  const submit = async (formFields: FormFields) => {
    const endpoint = API_BASE_URL + "/api/v1/organizations/register";
    const token = localStorage.getItem("token");
    const payload = { ...formFields, image: formFields.image[0] };

    try {
      const {
        data: { success },
      } = await axios.post(endpoint, toFormData(payload), {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Auth-Token": token,
        },
      });
      if (success) router.replace("/dashboard");
    } catch (error: any) {
      const { message } = error.response.data;
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <OrganizationDetails />
    </form>
  );
};

export default FormPage;
