import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Cookies from 'js-cookie'

function ProductCard({product}) {
    const navigate=useNavigate()
    
  const {addToCart} =useCart()
    const handleAddToCart=(product)=>{
        const token =Cookies.get('access_token')
        if(token){
         addToCart(product)
        }else{
         navigate('/sign-in')
        }
      } 
     

  return (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
    <img src={product.productImage} alt={product.title} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
    <p className="text-gray-600 text-lg mb-4">${product.price}</p>
    <p id={`desc-${product._id}`} className="hidden py-1 text-wrap max-w-full text-gray-600 mt-4 transition-all duration-150">
      {product.description}
    </p>
    <button 
    onClick={()=>{handleAddToCart(product)}}
    className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2 hover:bg-blue-700 transition-all duration-300">
      Add to Cart
    </button>
    <button
      onClick={() => document.getElementById(`desc-${product._id}`).classList.toggle("hidden")}
      className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
    >
      Product Details
    </button>

  </div>
  )
}

export default ProductCard;
