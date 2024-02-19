import Image from "next/image"
import Logo from '../../../public/logo.png'

const AboutPage = () => {
  return (
    <section className="min-h-[calc(100vh-150px)] ">
      <h1 className="text-3xl font-bold text-gray-800 p-5">AboutPage</h1>
      <div>
        <Image src={Logo} alt="Logo-Image" width={500} height={500} priority/>
      </div>
    </section>
  )
}

export default AboutPage