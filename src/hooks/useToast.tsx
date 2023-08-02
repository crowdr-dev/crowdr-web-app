import _toast, { ToastOptions } from "react-hot-toast";
import Toast from "@/app/shared-components/Toast";

const useToast = () => {
  return toast;
};

export default useToast;

const toast: Toast = (status, options) =>
  _toast.custom((t) => <Toast t={t} {...status} />, options);

export interface Toast {
  (status: Status, options?: ToastOptions): void;
}

export interface Status {
  title: string;
  body?: string;
  type?: "success" | "error" | "info" | "warning";
}