import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ProtectRoute = ({ children }: Props ) => {
  const { isAuthenticated, isLogged, isLoading } = useAuth();
  if (isLoading) {
    return <>Loading</>;
  }

  if (!isAuthenticated && !isLogged) {
    return <Navigate to={"/login"} replace />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
