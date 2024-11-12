"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const pathname = usePathname();

  const blacklists = [
    "/admin/dashboard",
    "/admin/product",
  ];
  const isBlacklist = blacklists.includes(pathname);

  if (isBlacklist) return <div>{children}</div>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
