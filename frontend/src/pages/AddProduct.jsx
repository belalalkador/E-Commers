import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate(); // Use navigate to redirect after successful product creation
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    productImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      productImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("productImage", form.productImage);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials:true
        }
      );

      if (response.data.success) {
        navigate("/dashbord/products"); // Redirect to products page on success
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 sm:mx-auto">
        <h1 className="text-center text-[32px] text-white font-bold mb-8 animate-fade-in-down">
          Add New Product
        </h1>
        <form className="px-4 space-y-6" onSubmit={handleSubmit}>
          <input
            id="title"
            type="text"
            required
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            className="w-full sm:w-[400px] mx-auto text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="category"
            type="text"
            required
            placeholder="Product Category"
            value={form.category}
            onChange={handleChange}
            className="w-full sm:w-[400px] mx-auto text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="description"
            type="text"
            required
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="w-full sm:w-[400px] mx-auto text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="price"
            type="number"
            required
            placeholder="Product Price"
            value={form.price}
            onChange={handleChange}
            className="w-full sm:w-[400px] mx-auto text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="productImage"
            type="file"
            required
            onChange={handleFileChange}
            className="w-full sm:w-[400px] mx-auto text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-[400px] mx-auto text-white block bg-blue-600 rounded-lg p-4 text-lg font-bold hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
