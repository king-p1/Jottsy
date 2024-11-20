"use client"
import { Navbar } from '@/components/navigations/navbar'
import Image from 'next/image'
import React from 'react'
import homeImg from '@/public/nome-img.png'
import { useConvexAuth } from 'convex/react'
import { Button } from '@/components/ui/button'
import { FaRegFileAlt } from "react-icons/fa";
import { TbLoader3 } from 'react-icons/tb'
import { useRouter } from 'next/navigation'

const Home = () => {
  const  {isAuthenticated,isLoading} = useConvexAuth()

  const router = useRouter()

  return (
    <div className='flex flex-col h-screen w-full dark:bg-[#161616]'>
      <Navbar/>


<div className="flex justify-center flex-col items-center motion-preset-expand motion-duration-1000 -mt-12 mb-2" >

<Image
alt='home'
width='400'
height='400'
src={homeImg}
/>
<div className="flex flex-col gap-3 text-center justify-center items-center">

<h1 className='text-5xl font-semibold'>Welcome to Jottsy</h1>

<p className="text-3xl flex flex-col gap-2 font-medium">
  A Next Generation Notes and Productivity app.

  <span className='text-2xl '>Stay organised, Stay Crative.</span>
</p>

{isAuthenticated && (<Button className='w-40 flex gap-2 font-medium  motion-preset-expand motion-duration-1000'
onClick={()=>router.push('/documents')}
>
  <FaRegFileAlt size={27}/>
Open Documents
</Button>)}

{isLoading && (
  <TbLoader3 size={33} className='animate-spin'/>
)}

</div>


</div>
      </div>
  )
}

export default Home