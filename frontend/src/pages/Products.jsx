import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../component/Spinner'; // Assume you have a spinner component for loading states

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(''); // State for search input

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/product/');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initially, filteredProducts is the same as fetched products
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    filterProducts(e.target.value);
  };

  // Filter the products based on the search input
  const filterProducts = (query) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/product/${id}`, {
        withCredentials: true
      });
      const updatedProducts = products.filter(product => product._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update the filtered products as well
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by product title"
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.productImage} alt={product.title} className="w-full h-32 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <div className="flex justify-between">
              <Link to={`/dashbaord/product/${product._id}`}>
                <button className="p-2 bg-yellow-500 text-white rounded-lg">Update</button>
              </Link>
              <button 
                onClick={() => handleDelete(product._id)} 
                className="p-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
