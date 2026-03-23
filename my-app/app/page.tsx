import Slideshow from "./components/Slideshow";
import Image from "next/image";
import Link from "next/link";
import TypingEffect from "./components/TypingEffect";

export default function Home() {
  const teamPhotos = ["/banner.jpeg", "/brand.png", "/book.jpeg"]
  return (
    <div className="bg-white">
      <div className="md:flex mx-2 p-2 mt-25 justify-between">
        <div className="md:w-full rounded-2xl shadow-purple-300 shadow-lg p-2 m-4 w-full"><div className="text-black m-2 p-2 md:text-5xl font-bold text-xl">Empowering Tribal Communities for a Better Future</div>
          <div className="text-gray-500 font-bold m-2 p-2 h-32">
            <TypingEffect
              text="Prokriti Sebashram Sangha is dedicated to restoring rights, education, and social equity for the tribal and minority section of our society through sustainable grassroots."
              speed={0.02}
              once={false}
            />
          </div>
          <div className="flex gap-5 justify-center items-center m-2 p-4">
            <div className="bg-purple-600 py-2 px-4 font-bold rounded-2xl cursor-pointer text-white md:text-xl hover:bg-purple-800 hover:active:bg-purple-300 shadow-purple-400 shadow-lg">Join our Mission</div>
            <Link href={"/contact"}><div className="bg-gray-400 text-white py-2 px-4 rounded-2xl font-bold hover:bg-gray-700 hover:active:bg-gray-200">Reach Us</div></Link>
          </div>

        </div>
        <Slideshow
          images={teamPhotos}
          className="w-full h-full aspect-video md:aspect-auto md:h-100 m-4 p-2"
        />
      </div>
      <div className="m-2 p-2 shadow-red-900 shadow-lg">
        <div className="text-red-900 font-extrabold text-5xl m-2 p-2">
          Key Impact Areas
        </div>
        <div className="md:flex">
          <div className="m-2 p-2">
            <Image src={"/edu.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Education</div>
            <div className="text-black">Establishing and granting aid to schools, ITI colleges, and engineering institutions.</div>
          </div>
          <div className="m-2 p-2">
            <Image src={"/med.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Healthcare</div>
            <div className="text-black">Running charitable hospitals, maternity homes, and health check-up centers.</div>
          </div>
          <div className="m-2 p-2">
            <Image src={"/ag.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Agriculture and Environment</div>
            <div className="text-black">Promoting organic farming, rainwater harvesting, and solar energy.</div>                      
          </div>
          <div className="m-2 p-2">
            <Image src={"/sc.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Social Empowerment</div>
            <div className="text-black">Supporting orphans, widows, the elderly, and those with disabilities.</div>                      
          </div>
        </div>
      </div>
    </div>
  );
}
