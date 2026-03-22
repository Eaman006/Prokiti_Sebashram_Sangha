"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoIosHome } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi2";
import { IoCallSharp } from "react-icons/io5";
import { MdLocalGroceryStore } from "react-icons/md";


const Navbar = () => {
  const pathname = usePathname();
  const getActiveClass=(path: string) =>{
    return pathname === path ? 'text-purple-600':'hover:text-purple-600'
  }
  return (
    
    <div className='bg-white text-black shadow-lg shadow-black/20 relative z-50'>
      <div className='flex justify-between items-center '>
        <div className='md:text-3xl font-bold p-4 text-purple-600'>
          Prokriti Sebashram Sangha
        </div>
        <div>
                    
          <ul className='hidden md:flex gap-10 m-2 justify-center items-center'>
            <li className={`cursor-pointer ${getActiveClass("/")}`}><Link className='flex items-center' href={"/"}><IoIosHome />Home</Link></li>
            <li className={`cursor-pointer ${getActiveClass("/about")}`}><Link className='flex items-center' href={"/about"}><HiUserGroup />About us</Link></li>
            <li className={`cursor-pointer ${getActiveClass("/contact")}`}><Link className='flex items-center' href={"/contact"}> <IoCallSharp />Contact us</Link></li>
            
          </ul>
          

        </div>
        <div className='bg-purple-600 m-2 px-4 py-2 rounded-xl cursor-pointer md:text-lg font-bold text-white hover:bg-purple-800 hover:active:bg-purple-500 transition duration-300 ease-in-out shadow-purple-600/20 shadow-md flex items-center'><MdLocalGroceryStore />Store</div>
      </div>
    </div>
  )
}

export default Navbar
