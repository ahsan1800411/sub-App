import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
interface User {
  data: {
    id: string;
    email: string;
  } | null;
  error: string | null;
  loading: boolean;
}

export const UserContext = createContext<
  [User, React.Dispatch<React.SetStateAction<User>>]
>([{ data: null, error: null, loading: true }, () => {}]);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    error: null,
    loading: true,
  });

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data } = await axios('http://localhost:8000/auth/me');
    if (data.data) {
      setUser({
        data: {
          id: data.data.id,
          email: data.data.email,
        },
        error: null,
        loading: false,
      });
    } else if (data.data.errors.length) {
      setUser({
        data: null,
        loading: false,
        error: data.data.errors[0].msg,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
