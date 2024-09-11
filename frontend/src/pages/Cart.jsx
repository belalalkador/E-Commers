import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Layout from "../component/Layout";
import { motion } from "framer-motion";
import { FaTrashAlt } from 'react-icons/fa';
import PaymentModal from '../component/PaymentModal'; // Import the PaymentModal component

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleBuy = () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setIsModalOpen(true); // Open the payment modal
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 pt-[75px]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 sm:mx-auto">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Your Cart
          </motion.h1>

          {/* Cart Summary */}
          <div className="mb-8">
            <p className="text-xl font-semibold text-gray-700 mb-2">Number of Products: {cart.length}</p>
            <p className="text-xl font-semibold text-gray-700">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img src={item.productImage} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                      <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Buy Now Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBuy}
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
};

export default Cart;
