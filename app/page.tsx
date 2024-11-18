"use client"
import { Navbar } from '@/components/navigations/navbar'
import { useConvexAuth } from 'convex/react'
import React from 'react'

const Home = () => {
  const  {isAuthenticated,isLoading} = useConvexAuth()
//todo use the above to display certain different elements on the page similarly to the navbar
  return (
    <div className='flex flex-col h-screen w-full'>
      <Navbar/>


<h1 className='text-3xl'>Welcome to jottsy</h1>
      </div>
  )
}

export default Home