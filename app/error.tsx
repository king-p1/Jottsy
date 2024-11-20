"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import errorImg from '@/public/404 error with portals-rafiki.png'
import React from 'react'

const Error = () => {
  return (
    <div className=" h-[88vh] flex flex-col items-center justify-center space-y-4">
<Image
src={errorImg}
width='430'
height='430'
alt="Error"
/>

<h2 className="text-2xl">
    Oops! Something went wrong.
</h2>

<Button asChild>
    <Link href={'/documents'}>
    Return to documents
    </Link>
</Button>

        </div>
  )
}

export default Error