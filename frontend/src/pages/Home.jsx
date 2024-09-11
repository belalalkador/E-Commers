import { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/product/products/bycategory");
        
        // Sort the products by category _id
        const sortedProducts = res.data.products.sort((a, b) => {
          if (a._id < b._id) return -1;
          if (a._id > b._id) return 1;
          return 0;
        });
  
        // Assign the sorted products to the state
        setProductsByCategory(sortedProducts);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700">
        <div className="text-center p-6 bg-white bg-opacity-80 rounded-lg shadow-lg max-w-4xl mx-4  sm:mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Discover Your Perfect Products
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Explore our wide range of products and find exactly what you need to enhance your lifestyle. Quality, style, and value, all in one place.
          </motion.p>
          <a href="#products" className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
            Buy Now
          </a>
        </div>
      </div>

      <div id="products" className="py-12">
        {productsByCategory.map((category) => (
          <div key={category._id} className="mb-12 pt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center capitalize">{category._id}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map((product) => (
               <ProductCard key={product._id} product={product}/>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to={`/products/category/${category._id}`}
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                See All {category._id} Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
