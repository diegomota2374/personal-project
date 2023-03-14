import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useAPI";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validatorToken(storageData);
        if (data.token) {
          setUser(data.token);
        }
      }
    };
    validateToken();
  }, [api]);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.token) {
      setUser(data.token);
      setToken(data.token);
      return true;
    }
    return false;
  };
  const register = async (name: string, email: string, password: string) => {
    const data = await api.register(name, email, password);
    if (data.token) {
      setUser(data.token);
      setToken(data.token);
      return true;
    } else if (data.email) {
      toast.error("Este email já foi cadastrado");
      return false;
    }
    return false;
  };
  const signout = async () => {
    await api.logout();
    setUser(null);
    setToken("");
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
