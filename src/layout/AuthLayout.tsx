import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 h-screen'>
        <div className='col-span-1 bg-amber-500'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-4xl font-bold text-white'>Welcome to Our App</h1>
                <p className='text-white mt-2'>Your one-stop solution for all your needs.</p>
            </div>
        </div>

        <div  className='col-span-2 bg-amber-50'>
            <Outlet />
            {/* This is where the nested routes will be rendered */}
        </div>

    </div>
  )
}

export default AuthLayout