'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';


const Layout = ({children}) => {
  const pathname = usePathname()

  return (
    <>
        <Header/>
          {children}
        <Footer/>
    </>
  )
}

export default Layout