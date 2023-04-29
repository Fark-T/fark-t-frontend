import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getProfile, login, logout, Login } from "../service/user";

type User = {
  id: string;
  username: string;
  password: string;
  fname: string;
  lname: string;
  phone: string;
  coin: number;
};

type Context = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: ({ username, password }: Login) => {};
  logout: () => {};
  isLogged: boolean;
};

const AuthContext = createContext<Context>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: login,
  logout: logout,
  isLogged: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: User = await getProfile();
        if (res) {
          setUser(res);
          setIsLogged(true);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLogged(false);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        isLogged,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
