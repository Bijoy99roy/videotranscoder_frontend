import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(undefined);

export function AuthProvider({children}:{ children: React.ReactNode}) {
    const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://whole-adapted-mammoth.ngrok-free.app/api/v1/auth/current_user', { withCredentials: true });
        console.log(response)
        setUser(response.data);

        if (response.data) {
          const userDataResponse = await axios.get('https://whole-adapted-mammoth.ngrok-free.app/api/v1/auth/user_data', { withCredentials: true });

          setUserData(userDataResponse.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userData, setUserData, loading  }}>
      {children}
    </AuthContext.Provider>
  );
}

