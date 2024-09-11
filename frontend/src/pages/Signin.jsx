import { Link, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import { useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";
import { useAuth } from "../context/UserContext";

const Signin = () => {
  const navigate = useNavigate();
  const [, setUser] = useAuth(); // Correctly destructure useAuth hook
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        form,{
          withCredentials:true,
        }
      );
      if (res.data.success) {
        setUser(res.data.user);  
        navigate("/"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); 
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to={"/sign-up"} className="text-blue-500 hover:underline">
              Do not have an account? <span className="text-orange-500">Sign up</span>
            </Link>
          </div>
          {error && !loading && (
            <p className="text-red-500 mt-4 text-center">{error}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
