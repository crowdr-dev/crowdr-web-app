import { getDataFromLocalStorage } from "@/utils/localStorageData";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectedRoute: RFC = ({ children }) => {
  const router = useRouter();
  const token = getDataFromLocalStorage("token");
  const isAuthenticated = token != undefined;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;

type RFC = React.FC<{ children: ReactNode }>;
