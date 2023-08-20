"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { LiaSpinnerSolid } from "react-icons/lia";
import "../styles/shared.css";

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      const endpoint = API_BASE_URL + `/api/v1/users/verify-email?${new URLSearchParams({token})}`;
      axios.get(endpoint).then(() => router.replace("/login"));
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <LiaSpinnerSolid
        size={50}
        color="#068645S"
        className="spinner animate-spin"
      />
    </div>
  );
};

export default VerifyEmail;
