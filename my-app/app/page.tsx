import Slideshow from "./components/Slideshow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const teamPhotos = ["/banner.jpeg","/brand.png"]
  return (
    <div className="bg-white">
      <div className="md:flex mx-4 p-2 mt-10 justify-between">
        <div className="md:w-full rounded-2xl shadow-purple-300 shadow-lg p-2 m-4 w-full"><div className="text-black m-2 p-2 md:text-5xl font-bold text-xl">Empowering Tribal Communities for a Better Future</div>
        <div className="text-gray-500 font-bold m-2 p-2">
          Prokriti Sebashram Sangha is dedicated to restoring rights, education, and social equity for the tribal and minority section of our society through sustainable grassroots
        </div>
        <div className="flex gap-5 justify-center items-center m-2 p-4">
          <div className="bg-purple-600 py-2 px-4 font-bold rounded-2xl cursor-pointer text-white md:text-xl hover:bg-purple-800 hover:active:bg-purple-300 shadow-purple-400 shadow-lg">Join our Mission</div>
          <Link href={"/contact"}><div className="bg-gray-400 text-white py-2 px-4 rounded-2xl font-bold hover:bg-gray-700 hover:active:bg-gray-200">Reach Us</div></Link>
        </div>        
          
        </div>
          <Slideshow 
  images={teamPhotos} 
  className="aspect-video md:aspect-auto md:h-[400px] m-4 p-2" 
/>

        


      </div>
    </div>
  );
}
