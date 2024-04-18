import Image from "next/image";

export default function ButtonSpinner(){
    return(
        <div className="flex justify-center items-center w-full">
            <Image src={'/loadering_1.gif'} width={200} height={200} alt="loader-image" className="w-7 h-7" />
        </div>
    )
}