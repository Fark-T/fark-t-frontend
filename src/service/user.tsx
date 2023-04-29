import axios from "axios";
import Cookies from "js-cookie";

export type Login = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: Login) => {
  try {
    const res = await axios.post("/api/Auth/login", { username, password });
    if (res.status === 200) {
      Cookies.set("token", res.data.token);
      const win: Window = window;
      win.location = "/order";
    }
  } catch (error) {}
};

export const logout = async () => {
  const token = Cookies.get("token");
  if (token) {
    Cookies.remove("token");
     const win: Window = window;
     win.location = "/login";
  }
};

export const getProfile = async () => {
  const token = Cookies.get("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get(`/api/Users/current`);
      return res.data;
    } catch (err) {
      logout();
    }
  }
};
