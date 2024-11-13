"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import AdminLayout from "./Admin/AdminLayout";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) return <AdminLayout>{children}</AdminLayout>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
