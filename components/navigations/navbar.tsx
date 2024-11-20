"use client"
import React from 'react'
import { ModeToggle } from '../themes/theme-toggler'
import { SignedIn, UserButton } from '@clerk/clerk-react'
import Image from 'next/image'
import logo from '@/public/jottsy.png'
import Link from 'next/link'
import {TbLoader3} from 'react-icons/tb'
import { useConvexAuth } from 'convex/react'
import { SignInButton } from '@clerk/clerk-react'
import { Button } from '../ui/button'
import { MdOutlineLogin } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa6";

const NavbarContent = () => {
const  {isAuthenticated,isLoading} = useConvexAuth()
  return (
    <div className="flex gap-3 items-center">
      {isLoading && (<TbLoader3 className='animate-spin' size={27}/>)}
      {!isAuthenticated && !isLoading && 
      (<SignInButton mode='modal'>
        <Button variant='default' size='sm' className='flex gap-2 items-center'>
          <MdOutlineLogin size={27}/>
          Get Jottsy</Button>
      </SignInButton>)}
      
    {isAuthenticated && !isLoading &&( 
    <div className="flex gap-3 items-center motion-preset-expand motion-duration-1000">

      <SignedIn>
        <UserButton
        />
      </SignedIn>
    
      <Button variant='default' size='sm' asChild >
        <Link className='flex gap-2 items-center' href={'/documents'}>
          <FaRegFolderOpen size={27}/>
          Enter Jottsy
        </Link>
          </Button>
    </div>  
    )}
      <ModeToggle/>
    </div>
  )
}

export const Navbar = () => {
  return (
    <nav className='w-full p-3 flex items-center justify-between'>
      <Link href={'/'}>
        <Image alt='logo' src={logo} width={80} height={80}/>
      </Link>
      <NavbarContent />
    </nav>
  )
}