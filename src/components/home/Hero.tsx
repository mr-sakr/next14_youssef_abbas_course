import { TiTick } from "react-icons/ti";
import Image from "next/image";
import Logo from "../../../public/logo.png";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex justify-around items-center text-[rgb(10,9,9)] p-[0_30px] max-md:h-auto max-md:flex-col max-md:justify-center max-md:p-[0_15px] ">
      <div className="max-md:bg-[snow] max-md:m-[20px_0] rounded-[20px] w-full p-[15px]">
        <h1 className="text-[44px] font-bold text-black">Cloud Hosting</h1>
        <p className="text-xl">The Best web Hosting Solution For Your Online Success</p>

        <div className="p-5 mt-4">
          <div className="flex items-center text-xl font-bold mb-1 text-[#555]">
            <TiTick /> Easy To Use Control Panel
          </div>
          <div className="flex items-center text-xl font-bold mb-1 text-[#555]">
            <TiTick /> Secure Hosting
          </div>
          <div className="flex items-center text-xl font-bold mb-1 text-[#555]">
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>

      <div>
        <Image src={Logo} alt="Logo Image" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;
