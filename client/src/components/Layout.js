import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PageTransition>
        <Sidebar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </PageTransition>
    </div>
  );
};

export default Layout;
