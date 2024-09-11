import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/UserContext";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose }) => {
  const navigate=useNavigate()
  const [selectedMethod, setSelectedMethod] = useState("");
  const {cart,setCart}=useCart()
const [user,]=useAuth()
  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handlePayment = async () => {
    try {
      // Map the product IDs from the cart
      const productIds = cart.map(item => item._id);
      
        
      const res = await axios.post('http://localhost:8080/api/v1/buy', {
        userId:user.id,
        productIds:JSON.stringify(productIds)
      }, {
        withCredentials: true,
      });
  
      // Check for success in the response
      if (res.data.success) {
        alert(res.data.message);
        setCart([])
        navigate('/')
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An error occurred during payment. Please try again.');
    } finally {
      // Close the popup window after the payment process
      onClose();
    }
  };
  

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>

            {!selectedMethod ? (
              <div className="space-y-4">
                <button
                  onClick={() => handleMethodSelect("Card")}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
                >
                  Pay with Card
                </button>
                <button
                  onClick={() => handleMethodSelect("PayPal")}
                  className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
                >
                  Pay with PayPal
                </button>
              </div>
            ) : (
              <div>
                {selectedMethod === "Card" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <button
                      onClick={handlePayment}
                      className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
                    >
                      Pay Now
                    </button>
                  </div>
                )}

                {selectedMethod === "PayPal" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="PayPal Email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    />
                    <button
                      onClick={handlePayment}
                      className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-all"
                    >
                      Pay Now
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-6 w-full px-4 py-2 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
