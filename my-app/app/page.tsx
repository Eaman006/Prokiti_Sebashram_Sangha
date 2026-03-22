
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="md:flex mx-4 p-2 mt-10 justify-between">
      <div className="text-black mx-auto text-5xl font-bold">Empowering Tribal Communities for a Better Future</div>
      <Image src={"/banner.jpeg"} height={600} width={600} alt=""></Image>
      
      </div>           
    </div>
  );
}
