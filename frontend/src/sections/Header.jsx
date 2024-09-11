import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch, BiBasket, BiMenu, BiX } from "react-icons/bi";
import { useAuth } from '../context/UserContext';
import Cookies from 'js-cookie';
import { useCart } from '../context/CartContext';
import axios from "axios";

const Header = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async() => {
 try {
  await axios.get("http://localhost:8080/api/v1/auth/signout",{
    withCredentials:true,
  })
  setUser(null);
  setCart([]);
  navigate('/sign-in');
 } catch (error) {
  console.log(error);
 }
   
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(!searchQuery )
    return alert('your input is empty')

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (<header 
  className={`${isMenuOpen? "h-auto z-10" :"h-[60px] z-10"} fixed top-0 left-0 right-0 flex  justify-between flex-col sm:flex-row sm:items-center px-5 py-2 bg-black backdrop-blur-lg bg-opacity-80 shadow-lg  transition-[hieght] duration-500 overflow-hidden  `}>
      <div className="basis-[100%] sm:basis-[20%]  flex justify-between items-center h-[60px] mb-2 sm:mb-0">
       <Link
        to="/"
       className="text-white text-nowrap text-[28px] font-bold  hover:text-blue-400 transition-colors duration-300"
    >
       Belal-Shop
   </Link>

       <button
       className="text-white text-[28px] sm:hidden focus:outline-none"
       onClick={toggleMenu}>
      {isMenuOpen ? <BiX /> : <BiMenu />}
     </button>
      </div>
      <div className={`basis-[100%] sm:basis-[80%] flex  flex-col justify-start  sm:flex-row sm:items-center sm:gap-[100px] pb-1 sm:pb-0 ` }>
           <nav className="flex flex-col sm:flex-row text-white gap-[6px] sm:gap-6">
           <Link to="/" className="hover:text-blue-400 transition-all duration-200">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition-all duration-200">About</Link>
         </nav>
         <div className="py-2 sm:py-0">
         <form onSubmit={handleSearchSubmit} className="basis-[100%] sm:basis[20%] flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md">
           <input
               type="search"
               placeholder="Search"
               value={searchQuery}
               onChange={handleSearchInput}
               className="w-full md:w-[200px] p-2 text-white bg-transparent placeholder-gray-400 outline-none pl-4 focus:bg-opacity-30"
             />
            <button type="submit" className="text-white bg-blue-500 p-2 hover:bg-blue-600 transition-all duration-300">
               <BiSearch />
            </button>
           </form>
         </div>
      <div className="flex-1 flex justify-between items-center py-1 sm:py-0 ">
      
             {user?.id ? (
               <>
                 <div className="flex items-center gap-6 justify-end">
                   <Link to="/profile" className="text-white hover:text-blue-400 transition-all duration-200">Profile</Link>
                   <button onClick={handleLogout} className="text-white hover:text-red-400 transition-all duration-200">
                     Logout
                   </button>
                   {user.is_Admin && (
                     <Link to="/dashboard/add" className="text-white hover:text-blue-400 transition-all duration-200">
                       Dashboard
                     </Link>
                   )}
                 </div>
               </>
             ) : (
               <Link to="/sign-in" className="flex-1  text-white hover:text-blue-400 transition-all duration-200">
                 Sign In
               </Link>
             )}
            <Link to="/cart" className="relative text-white text-[32px] hover:text-blue-400 transition-all duration-200">
               <BiBasket />
               <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
             </Link>
           </div>
      </div>

      
      

  </header>)

  // return (
  //   <header className="bg-black backdrop-blur-lg bg-opacity-80 shadow-lg flex-wrap sticky top-0 z-50 flex items-center justify-between px-5 py-4 transition-all duration-300 ease-in-out">
  // <div className="flex justify-between items-center basis-[100%] md:basis-[25%]">
  // <Link
  //       to="/"
  //       className="text-white text-nowrap text-[28px] font-bold basis-[75%] sm:basis-[25%] sm:text-start hover:text-blue-400 transition-colors duration-300"
  //     >
  //       Belal-Shop
  //     </Link>

  //     <button
  //       className="text-white text-[28px] sm:hidden focus:outline-none"
  //       onClick={toggleMenu}
  //     >
  //       {isMenuOpen ? <BiX /> : <BiMenu />}
  //     </button>
  // </div>

 
  //     <div
  //       className={`${
  //         isMenuOpen ? "block" : "hidden"
  //       } basis-[100%] sm:basis-[75%] flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between  transition-all duration-300 ease-in-out`}
  //     >
  //       <nav className="flex flex-col justify-start  sm:flex-row sm:gap-6 items-center sm:basis-[30%] text-white">
  //         <Link to="/" className="hover:text-blue-400 transition-all duration-200">Home</Link>
  //         <Link to="/about" className="hover:text-blue-400 transition-all duration-200">About</Link>
  //       </nav>

  //       <div className="flex flex-col sm:flex-row items-center sm:gap-4 sm:basis-[50%] mt-3 sm:mt-0">
  //         <form onSubmit={handleSearchSubmit} className="basis-[100%] sm:basis[20%] flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-md">
  //           <input
  //             type="search"
  //             placeholder="Search"
  //             value={searchQuery}
  //             onChange={handleSearchInput}
  //             className="w-full md:w-[200px] p-2 text-white bg-transparent placeholder-gray-400 outline-none pl-4 focus:bg-opacity-30"
  //           />
  //           <button type="submit" className="text-white bg-blue-500 p-2 hover:bg-blue-600 transition-all duration-300">
  //             <BiSearch />
  //           </button>
  //         </form>

  //         <div className="flex items-center gap-4 mt-3 sm:mt-0">
  //           {user?.id ? (
  //             <>
  //               <div className="flex items-center gap-4">
  //                 <Link to="/profile" className="text-white hover:text-blue-400 transition-all duration-200">Profile</Link>
  //                 <button onClick={handleLogout} className="text-white hover:text-red-400 transition-all duration-200">
  //                   Logout
  //                 </button>
  //                 {user.is_Admin && (
  //                   <Link to="/dashboard/add" className="text-white hover:text-blue-400 transition-all duration-200">
  //                     Dashboard
  //                   </Link>
  //                 )}
  //               </div>
  //             </>
  //           ) : (
  //             <Link to="/sign-in" className="text-white hover:text-blue-400 transition-all duration-200">
  //               Sign In
  //             </Link>
  //           )}
  //           <Link to="/cart" className="relative text-white text-[32px] hover:text-blue-400 transition-all duration-200">
  //             <BiBasket />
  //             <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default Header;
