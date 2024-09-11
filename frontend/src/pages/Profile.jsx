import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../component/Layout';
import Spinner from '../component/Spinner';
import Cookies from 'js-cookie';
import { useAuth } from '../context/UserContext';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUserP] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [, setUser] = useAuth(); // Update auth context

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/auth/user", {
                  withCredentials:true
                });
                setUserP(res.data.user);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        setUser(null);
        navigate('/sign-in');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/auth/user/${user.id}`, {
                  withCredentials:true
                });
                handleLogout(); // Log out after account deletion
            } catch (err) {
                setError('Failed to delete account');
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <Layout>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-400 to-green-700 p-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {user ? (
                        <>
                            <h1 className="text-white text-3xl font-bold text-center mb-6">Profile</h1>
                            <div className="text-white text-lg mb-4">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={handleLogout}
                                    className="w-[48%] text-white bg-blue-600 rounded-lg p-4 font-bold hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="w-[48%] text-white bg-red-600 rounded-lg p-4 font-bold hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-white text-center">Failed to load profile</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
