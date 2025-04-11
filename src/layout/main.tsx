import React, { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';

interface MainProps {
  children: ReactNode;
}

const Main = () => {
  return (
    <div>
    <Header/>

    <div className='h-screen'>
      <Outlet />
    </div>

    <Footer></Footer>

    </div>
  )
}

export default Main