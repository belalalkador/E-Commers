import { Link, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import { useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";

const Signup = () => {
  const navigate = useNavigate();
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
    setError(""); // Clear previous errors
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        form
      );
      if (res.data.success) {
        navigate("/sign-in");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading after success or failure
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="flex justify-center items-center min-h-[90vh] bg-gradient-to-r from-green-400 to-blue-500">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              onChange={handleChange}
              type="text"
              placeholder="Name"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              id="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              id="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-200"
            >
              Create
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Already have an account?{" "}
              <span className="text-orange-500">Sign in</span>
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

export default Signup;
