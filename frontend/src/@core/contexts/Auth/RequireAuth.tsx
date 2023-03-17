import { useContext } from "react";
import Auth from "../../../pages/Auth/[index]";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Auth />;
  }
  return children;
};
