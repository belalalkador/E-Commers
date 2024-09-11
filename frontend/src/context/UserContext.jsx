import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
  
          try {
          const res = await axios.get("http://localhost:8080/api/v1/auth/user", {
           withCredentials:true
          });

          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
     
      
      setLoading(false);
    };

    initializeUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
