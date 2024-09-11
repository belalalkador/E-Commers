import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../component/Layout";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from 'js-cookie'
import { useCart } from "../context/CartContext";

const CategoryProducts = () => {
  const { category } = useParams(); // Get the category from the URL parameters
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()
  const {addToCart} =useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/product/products/${category}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching products");
      }
    };

    fetchProducts();
  }, [category]);
  const handleAddToCart=(product)=>{
    const token =Cookies.get('access_token')
    if(token){
     addToCart(product)
    }else{
     navigate('/sign-in')
    }
  } 
  return (
    <Layout>
      <div className="min-h-[90vh] p-6 bg-gradient-to-br from-green-400 to-blue-600">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-center text-white font-bold mb-10 capitalize">
            {category} Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={product.productImage} // Replace with your image field
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                <p className="text-lg text-gray-600 mt-2">${product.price}</p>
                <div className="flex justify-between mt-4">
                  <button
                  onClick={()=>{handleAddToCart(product)}} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
                    Add to Cart
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                    onClick={() => alert(`Product Details for ${product.title}`)}
                  >
                    Product Details
                  </button>
                </div>
                {/* Expandable description */}
                <motion.p
                  className="text-sm text-gray-600 mt-4"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {product.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
