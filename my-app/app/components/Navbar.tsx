"use client"
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoIosHome, IoIosMenu, IoMdClose } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { IoCallSharp } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveClass = (path: string) => {
    return pathname === path ? 'text-purple-600' : 'text-black hover:text-purple-600';
  }
  const getActiveClass2 = (path: string) => {
    return pathname === path ? 'text-purple-600 bg-gray-200 rounded-lg' : 'text-black hover:text-purple-600';
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className='bg-white shadow-lg shadow-black/20 z-50 fixed w-full'>
        <div className='flex justify-between items-center px-2 py-2'>
          <div className='md:text-3xl font-bold p-2 text-purple-600'>
            Prokriti Sebashram Sangha
          </div>

          {/* Desktop Links */}
          <div>
            <ul className='hidden md:flex gap-10 m-2 justify-center items-center font-medium'>
              <li className={`cursor-pointer transition duration-300 ${getActiveClass("/")}`}>
                <Link className='flex items-center gap-1' href={"/"}><IoIosHome />Home</Link>
              </li>
              <li className={`cursor-pointer transition duration-300 ${getActiveClass("/about")}`}>
                <Link className='flex items-center gap-1' href={"/about"}><HiUserGroup />About us</Link>
              </li>
              <li className={`cursor-pointer transition duration-300 ${getActiveClass("/contact")}`}>
                <Link className='flex items-center gap-1' href={"/contact"}> <IoCallSharp />Contact us</Link>
              </li>
            </ul>
          </div>

          {/* Store Button */}
          <div className='bg-purple-600 m-2 px-4 py-2 rounded-xl cursor-pointer md:text-lg font-bold text-white hover:bg-purple-800 hover:active:bg-purple-500 transition duration-300 ease-in-out shadow-purple-600/20 shadow-md flex items-center text-sm gap-1'>
            <MdLocalGroceryStore />Store
          </div>

          {/* Mobile Menu Trigger */}
          <div
            onClick={toggleMenu}
            className='md:hidden flex-col mx-auto text-md hover:text-purple-600 transition duration-300 cursor-pointer m-2 p-2 text-black'
          >
            <IoIosMenu />Menu
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] md:hidden transition-opacity"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white/95 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="text-3xl text-black hover:text-purple-600 transition duration-300"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className='flex flex-col gap-6 mt-8 px-8 font-semibold text-lg'>
          <li className={`cursor-pointer transition duration-300 ${getActiveClass2("/")}`} onClick={closeMenu}>
            <Link className='flex items-center gap-3' href={"/"}><IoIosHome className="text-xl" />Home</Link>
          </li>
          <li className={`cursor-pointer transition duration-300 ${getActiveClass2("/about")}`} onClick={closeMenu}>
            <Link className='flex items-center gap-3' href={"/about"}><HiUserGroup className="text-xl" />About us</Link>
          </li>
          <li className={`cursor-pointer transition duration-300 ${getActiveClass2("/contact")}`} onClick={closeMenu}>
            <Link className='flex items-center gap-3' href={"/contact"}><IoCallSharp className="text-xl" />Contact us</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar;