import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div> 
        <Sidebar/>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
