import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="flex mx-2 p-2 mt-10 justify-between">
      <div className="text-black mx-auto text-2xl font-bold">Empowering Tribal Communities for a Better Future</div>
      <Image src={"/banner.jpeg"} height={500} width={500} alt=""></Image> 
      </div>           
    </div>
  );
}
