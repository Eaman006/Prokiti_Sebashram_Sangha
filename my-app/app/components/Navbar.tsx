import React from 'react'

const Navbar = () => {
  return (
    
    <div className='bg-white text-black'>
      <div className='flex justify-between items-center'>
        <div className='text-3xl font-bold p-4'>
          Prokriti Sebashram Sangha
        </div>
        <div>
          <ul className='flex gap-5 m-2 justify-center items-center'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About us</li>
            <li className='cursor-pointer'>Contact us</li>
            <div className='bg-purple-600 p-2 rounded-xl cursor-pointer text-lg font-bold text-white hover:bg-purple-700 hover:active:bg-purple-500 transition duration-300 ease-in-out shadow-2xl'>Store</div>
          </ul>

        </div>
      </div>
    </div>
  )
}

export default Navbar
