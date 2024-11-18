"use client"
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { useConvexAuth } from 'convex/react'
import { TbLoader3 } from 'react-icons/tb'
import { DocNavigations } from '@/components/navigations/doc-navigations'

const DashboardLayout = ({children}:{
    children:ReactNode
}) => {
    const  {isAuthenticated,isLoading} = useConvexAuth()

  if (!isAuthenticated && !isLoading) redirect('/')
    

if(isLoading){
    return(
        <div className='h-[88vh] w-full flex justify-center items-center'>
            <TbLoader3 className='animate-spin' size={65}/>
        </div>
    )
}

  return (
    <section className='flex h-screen dark:bg-[#1f1f1f]'>
<DocNavigations/>

<main className='flex-1 h-screen overflow-y-auto'>
        {children}
</main>
        </section>
  )
}

export default DashboardLayout