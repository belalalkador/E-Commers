import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateUser = () => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/user", {
          withCredentials: true
        });
        
        if (res.data.success) {
          setUser(true);
        } else {
          setUser(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error); // Improved error logging
        setUser(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateUser;
