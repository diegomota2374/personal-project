import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API,
});

export const useApi = () => ({
  validatorToken: async (token: string) => {
    const res = await api.post("/auth/validate", { token });
    return res.data;
  },
  signin: async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },
  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },
  register: async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  },
});
