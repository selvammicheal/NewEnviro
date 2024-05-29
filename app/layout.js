"use client";
import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import localFont from "@next/font/local";
import "./globals.css";

import CustomNavbar from "@/components/layouts/Navbar";
import CustomSidebar from "@/components/layouts/Sidebar";
import ProjectSidebar from "@/components/layouts/ProjectSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider } from 'react-redux';
import store from "@/redux/store/store";
import SurveySidebar from "@/components/layouts/SurveySiderbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSideBarOpen] = useState();

  useEffect(() => {
    setSideBarOpen(pathname.startsWith("/projectmanagement") ? false : true);
  }, [pathname]);

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="the-body">
          <div className="inner-body">
            <CustomSidebar sidebarOpen={sidebarOpen} />
            {pathname.startsWith("/projectmanagement") ? (
              <ProjectSidebar />
            ) : null}
            {pathname.startsWith("/survey") ? (
              <SurveySidebar />
            ) : null}
            <div className="content-container-body">
              <CustomNavbar />
              <div className="child-container">{children}</div>
            </div>
          </div>
        </body>
      </Provider>
    </html>
  );
}
