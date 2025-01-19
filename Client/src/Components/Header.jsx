import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between bg-[#2d034f] m-0 p-4 text-white align-middle'>
        <h1 className='text-xl font-semibold'>ManageWare</h1>

        <span className='flex gap-3 align-middle'>
            
            <a href="/"  className="hover:text-purple-900 hover:bg-white hover:cursor-pointer text-xs self-center p-1">Home</a>
            <a href="/inventory" className="hover:text-purple-900 hover:bg-white hover:cursor-pointer text-xs self-center p-1">Inventory</a>
            <a href="/orders" className="hover:text-purple-900 hover:bg-white hover:cursor-pointer text-xs self-center p-1">Orders</a>
        </span>
    </div>
  )
}

export default Header