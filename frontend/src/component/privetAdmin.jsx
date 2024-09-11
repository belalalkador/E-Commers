import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdmin = () => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component is unmounted

    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/check-admin", {
          withCredentials: true
        });

        if (isMounted) {
          // Check the response data
          if (res.data && res.data.ok) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to check admin status", error); // Log the error for debugging
          setAdmin(false);
          setLoading(false);
        }
      }
    };

    checkAdmin();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return admin ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateAdmin;
