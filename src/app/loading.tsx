import Image from "next/image"

const loading = () => {
  return (
    <div className="h-[calc(100vh-150px)] flex justify-center items-center">
        <div>
            <Image src={'/loadering_1.gif'} width={200} height={200} alt="loader-image" />
        </div>
    </div>
  )
}

export default loading