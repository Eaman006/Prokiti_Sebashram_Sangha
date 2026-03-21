import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white text-black'>
      <div className='flex justify-between items-center'>
        <div className='text-3xl font-bold p-4'>
          Prokriti Sebashram Sangha
        </div>
        <div>
          <ul className='flex gap-5'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
