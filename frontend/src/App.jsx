import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashbord';
import PrivetAdmin from './component/privetAdmin';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import About from './pages/About';
import Profile from './pages/Profile';
import PrivetUser from './component/PrivetUser';
import EditProduct from './pages/EditeProduct';
import Cart from './pages/Cart';
import CategoryProducts  from './pages/CatgoryProducts';
import BuyingUsers from './pages/BuyingUsers';
import Search from './pages/Search';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/products/category/:category' element={<CategoryProducts />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        
   <Route element={<PrivetUser/>}>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/cart' element={<Cart/>}/>
   </Route>

       <Route element={<PrivetAdmin/>}>
       <Route element={<Dashboard/>}>
          <Route  path='/dashboard/add' element={<AddProduct/>}/>
          <Route path='/dashbord/products' element={<Products/>}/>
          <Route path='/dashbaord/product/:id' element={<EditProduct/>}/>
          <Route path='/dashbord/users' element={<BuyingUsers/>}/>
        
        </Route>
       </Route>

      </Routes>
    </Router>
  );
}

export default App;
