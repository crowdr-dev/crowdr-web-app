"use client";
import { getUser } from "@/app/api/user/getUser";
import Button from "@/app/common/components/Button";
import useToast from "@/app/common/hooks/useToast";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import makeRequest from "@/utils/makeRequest";
import { useState } from "react";

export default function ResendConfirmationEmail() {
  const toast = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const resendEmail = async () => {
    try {
      setSubmitting(true);
      const user = (await getUser())!;
      const endpoint = `/api/v1/users/resend-verification-link`;

      const headers = {
        // certain that token should be defined here, cause their is middleware protecting this route
        "x-auth-token": user.token!,
      };

      const data = await makeRequest<{ message: string }>(endpoint, {
        headers,
        method: "GET",
        cache: "no-store",
      });
      toast({ title: "success!", body: data.message, type: "success" });
    } catch (error: any) {
      const message = extractErrorMessage(error);
      toast({ title: "Oops!", body: message, type: "error" });
    }
    setSubmitting(false);

  };
  return (
    <>
    <Button
              type="button"
              text="Resend confirmation email"
              isSubmitting={isSubmitting}
              className="mb-[21px] mt-[15px]"
              onClick={resendEmail}
            />
    </>
    
  );
}

