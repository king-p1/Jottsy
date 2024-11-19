"use client"
import { Button } from '@/components/ui/button'
import docImg from '@/public/Website Creator-pana.png'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { PiNotePencilDuotone } from "react-icons/pi";
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

const Documents = () => {
const {user} = useUser()
const create = useMutation(api.documents.create)

const handleCreate = () =>{
  const promise = create({
    title:'Untitled'
  })
toast.promise(promise,{
  loading:'Creating a new document...',
  success:'New document created successfully!',
  error:'Failed to create document.'
})
}

    return (
    <div className='h-full flex-col gap-3 flex items-center justify-center'>
       <Image
       src={docImg}
       width="450"
       height="450"
       alt='picture'
       /> 

<h2 className="text-xl font-semibold">
    Welcome to {user?.firstName}&apos;s Jottsy
</h2>

<Button className='flex items-center gap-2 font-medium'
onClick={handleCreate}
>
<PiNotePencilDuotone size={37}/>
Create a document
</Button>

    </div>
  )
}

export default Documents