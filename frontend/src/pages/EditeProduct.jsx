import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../component/Spinner';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    productImage: null, // Initialize for product image
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/${id}`, {
          withCredentials: true,
        });
        setProduct(response.data.product);
        setForm({
          title: response.data.product.title,
          category: response.data.product.category,
          description: response.data.product.description,
          price: response.data.product.price,
          productImage: null, // Keep image null initially
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'productImage') {
      setForm({
        ...form,
        productImage: files[0], // Handle file input
      });
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
         
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('price', form.price);
      if (form.productImage) {
        formData.append('productImage', form.productImage); // Append the image if present
      }

      const res = await axios.put(`http://localhost:8080/api/v1/product/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        navigate('/dashbord/products');
      }
    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 sm:mx-auto">
        <h1 className="text-center text-[32px] text-white font-bold mb-8">Edit Product</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            placeholder="Product Category"
            className="w-full text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full text-gray-900 block bg-white bg-opacity-30 backdrop-blur-md p-4 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          />
          <input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white block bg-blue-600 p-4 text-lg font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          />
          <button
            type="submit"
            className="w-full text-white block bg-blue-600 rounded-lg p-4 text-lg font-bold hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
