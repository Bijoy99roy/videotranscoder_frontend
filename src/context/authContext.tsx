import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(undefined);

export function AuthProvider({children}:{ children: React.ReactNode}) {
    const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/auth/current_user', { withCredentials: true });
        console.log(response)
        setUser(response.data);

        if (response.data) {
          const userDataResponse = await axios.get('http://localhost:3000/api/v1/auth/user_data', { withCredentials: true });
          console.log(userDataResponse)
          setUserData(userDataResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

