"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link';

const Navbar = () => {
  const pathname = usePathname();
  const getActiveClass=(path: string) =>{
    return pathname === path ? 'text-purple-600':'hover:text-purple-600'
  }
  return (
    
    <div className='bg-white text-black shadow-lg shadow-black/20 relative z-50'>
      <div className='flex justify-between items-center '>
        <div className='text-3xl font-bold p-4 text-purple-600'>
          Prokriti Sebashram Sangha
        </div>
        <div>
          <ul className='flex gap-10 m-2 justify-center items-center'>
            <li className={`cursor-pointer ${getActiveClass("/")}`}><Link href={"/"}>Home</Link></li>
            <li className={`cursor-pointer ${getActiveClass("/about")}`}><Link href={"/about"}>About us</Link></li>
            <li className={`cursor-pointer ${getActiveClass("/contact")}`}><Link href={"/contact"}>Contact us</Link></li>
            
          </ul>
          

        </div>
        <div className='bg-purple-600 m-2 px-4 py-2 rounded-xl cursor-pointer text-lg font-bold text-white hover:bg-purple-800 hover:active:bg-purple-500 transition duration-300 ease-in-out shadow-purple-600/20 shadow-md'>Store</div>
      </div>
    </div>
  )
}

export default Navbar
