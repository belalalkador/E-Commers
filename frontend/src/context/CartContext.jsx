import { createContext, useContext, useState } from "react";

// Create CartContext
const CartContext = createContext(null);

// CartProvider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export default CartProvider;
