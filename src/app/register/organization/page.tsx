"use client";
import { OrganizationFormContext } from "@/app/register/utils/useOrganizatonForm";
import ProtectedRoute from "@/app/shared-components/ProtectedRoute";
import Topbar from "../register-components/Topbar";
import FormPage from "./FormPage";

const Register = () => {
  return (
    <ProtectedRoute>
      <Topbar />
      <OrganizationFormContext>
        <FormPage />
      </OrganizationFormContext>
    </ProtectedRoute>
  );
};

export default Register;
