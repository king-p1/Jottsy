"use client"
import { Button } from '@/components/ui/button'
import docImg from '@/public/Website Creator-pana.png'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'
import { PiNotePencilDuotone } from "react-icons/pi";

const Documents = () => {
const {user} = useUser()

    return (
    <div className='h-full flex-col gap-3 flex items-center justify-center'>
       <Image
       src={docImg}
       width="450"
       height="450"
       alt='picture'
       /> 

<h2 className="text-xl font-semibold">
    Welcome to {user?.firstName}&apos; Jottsy
</h2>

<Button className='flex items-center gap-2 font-medium'>
<PiNotePencilDuotone size={37}/>
Create a note
</Button>

    </div>
  )
}

export default Documents