import { Link, Outlet } from 'react-router-dom';
import Layout from '../component/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex p-4 gap-4 justify-between mb-6 pt-[70px] ">
        <Link
          to={'/dashboard/add'}
          className="p-3 rounded-lg flex-1 bg-blue-500 text-white block text-center hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          Add New
        </Link>
        <Link
          to={'/dashbord/products'}
          className="p-3 rounded-lg flex-1 bg-blue-500 text-white block text-center hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          Products
        </Link>
        <Link
          to={'/dashbord/users'}
          className="p-3 rounded-lg flex-1 bg-blue-500 text-white block text-center hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
         Buying User
        </Link>
      
      </div>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
};


export default Dashboard;
