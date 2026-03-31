import Slideshow from "./components/Slideshow";
import Image from "next/image";
import Link from "next/link";
import TypingEffect from "./components/TypingEffect";
import FadeIn from "./components/FadeIn";
import AnimatedCounter from "./components/AnimatedCounter";
import VisionMap from "./components/VisionMap";

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
            <FadeIn direction="right" delay={1}>
            <div className="bg-purple-600 py-2 px-4 font-bold rounded-2xl cursor-pointer text-white md:text-xl hover:bg-purple-800 hover:active:bg-purple-300 shadow-purple-400 shadow-lg">Join our Mission</div>
            </FadeIn>
            <FadeIn direction="right" delay={1.5}>
            <Link href={"/contact"}><div className="bg-gray-400 text-white py-2 px-4 rounded-2xl font-bold hover:bg-gray-700 hover:active:bg-gray-200">Reach Us</div></Link>
            </FadeIn>
          </div>

        </div>
        <Slideshow
          images={teamPhotos}
          className="w-full h-full aspect-video md:aspect-auto md:h-100 m-4 p-2"
        />
      </div>
      <div className="m-4 p-2 shadow-red-900 shadow-lg rounded-2xl">
        <div className="text-red-900 font-extrabold text-5xl m-2 p-2">
          <FadeIn>
          Key Impact Areas
          </FadeIn>
        </div>
        <div className="md:flex">
          <FadeIn direction="up" delay={0.2}>
          <div className="m-2 p-2">
            <Image src={"/edu.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Education</div>
            <div className="text-black">Establishing and granting aid to schools, ITI colleges, and engineering institutions.</div>
            <div className="text-center font-bold text-4xl text-blue-700 mt-5"><AnimatedCounter target={50} /></div>
            <div className="text-blue-700 text-center text-sm">Educational Institute impacted</div>
          </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
          <div className="m-2 p-2">
            <Image src={"/med.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Healthcare</div>
            <div className="text-black">Running charitable hospitals, maternity homes, and health check-up centers.</div>
            <div className="text-center font-bold text-4xl text-blue-700 mt-5">
              <AnimatedCounter target={70} />
            </div>
            <div className="text-blue-700 text-center text-sm">Healthcare Projects</div>
          </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.6}>
          <div className="m-2 p-2">
            <Image src={"/ag.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Agriculture and Environment</div>
            <div className="text-black">Promoting organic farming, rainwater harvesting, and solar energy.</div>
            <div className="text-center font-bold text-4xl text-blue-700 mt-5">
              <AnimatedCounter target={40} />
            </div>
            <div className="text-blue-700 text-center text-sm">Agricultural Products</div>
          </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.8}>
          <div className="m-2 p-2">
            <Image src={"/sc.png"} height={50} width={50} alt="bg"></Image>
            <div className="text-black font-bold text-xl">Social Empowerment</div>
            <div className="text-black">Supporting orphans, widows, the elderly, and those with disabilities.</div>
            <div className="text-center font-bold text-4xl text-blue-700 mt-5">
              <AnimatedCounter target={30} />
            </div>
            <div className="text-blue-700 text-center text-sm">Orphan Homes Supported</div>
          </div>
          </FadeIn>
        </div>
        
      </div>
      <div className="m-4 p-2">
        <FadeIn direction="right" delay={0.2}>
        <div className="text-5xl text-amber-700 font-extrabold">Our Vision</div>
        </FadeIn>
        <div className="m-2 p-2 text-black text-lg md:h-10 h-96">
          <TypingEffect
              text="Our vision is to function as a secular, irrevocable public trust dedicated to the socio-economic upliftment of the people of India. We strive to blend traditional cultural preservation with modern scientific advancement—ranging from organic agriculture to higher technical education—to ensure a future defined by equity, knowledge, and universal brotherhood."
              speed={0.01}
              once={false}
            />
        </div>
        <div>
          <FadeIn direction="right" delay={0.2}>
        <VisionMap></VisionMap>
        </FadeIn>
        </div>

      </div>
    </div>
  );
}
