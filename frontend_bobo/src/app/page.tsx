import Image from 'next/image'
import Link from 'next/link';
import BgImage from '../../images/Bobo-bg1.png';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mr-32 justify-end flex w-full bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none gap-4">
        <Link href="/signup">
          <button className="text-black-500 font-bold py-2 px-4 rounded-md bg-red-500 h-10">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="text-black-500 font-bold py-2 px-4 rounded-md bg-gray-400 h-10">
            Login
          </button>
        </Link>
      </div>
      
      <div className="bg-secondary-400 h-hero_height_sm md:h-hero_height_lg w-full">
        <div className='flex justify-start absolute w-full'>
          <Image src={BgImage} alt="bobo-bg" className='object cover h-full w-1400'/>
        </div>
      </div>

      <div className="mt-10 md:mt-20 absolute items-center text-secondary-500 w-full">
        <div className="font-bold h-header_height_lg w-full text-center text-5xl md:text-7xl hidden md:flex flex-col">
          <span  className="bg-gradient-to-r from-pink-300 to-black bg-clip-text text-transparent" >Made for Parents.</span>
          <span className="bg-gradient-to-r from-pink-300 to-black bg-clip-text text-transparent">Built for Babies.</span>
        </div>

        <div className="md:hidden font-bold items-center h-header_height_lg w-full text-center text-2xl xsm:text-4xl md:text-6xl flex flex-col">
          <span className="bg-gradient-to-r from-pink-300 to-black bg-clip-text text-transparent" >Made for Parents.</span>
          <span className="bg-gradient-to-r from-pink-300 to-black bg-clip-text text-transparent" >Built for Babies.</span>
        </div>

        <div className="flex flex-col font-semibold text-black text-center text-xl xsm:text-base">
          <span>Creating an enriching experience in the</span>
          <span>course of your baby&apos;s growth and development.</span>
        </div>

        <div className="mt-8 flex justify-center">
          <input
            type="email"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-64 sm:w-80 focus:outline-none h-10 gap-2"
            placeholder="Enter your email address"
          />
          <button className="bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 h-10">
            Explore
          </button>
        </div>
      </div>
    </main>
  );
}
