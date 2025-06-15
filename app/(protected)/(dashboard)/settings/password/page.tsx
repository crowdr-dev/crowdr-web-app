'use client'
import PasswordFormContext from "../utils/usePasswordForm";
import PasswordForm from "./PasswordForm";

const PasswordPage = () => {
  return (
    <PasswordFormContext>
      <PasswordForm />
    </PasswordFormContext>
  );
}

export default PasswordPage;