import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="absolute w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;