"use client"
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import {  useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ConfirmModal } from '../modal/confirm-modal'


export const Banner = ({documentId}:{documentId:Id<"documents">}) => {
const router = useRouter()
const remove = useMutation(api.documents.deleteDoc)
const restore = useMutation(api.documents.restoreDoc)

const onRemove = () => {
    const promise = remove({id:documentId})
        .then(() => {
            router.push("/documents");
            router.refresh();
        });
    toast.promise(promise,{
        loading:'Deleting document...',
        success:'Document has been deleted!',
        error:'Failed to delete document.'
    })
}

const onRestore = () => {
    const promise = restore({id:documentId})
    toast.promise(promise,{
        loading:'Restoring archived document...',
        success:'Archived document restored!',
        error:'Failed to restore document.'
      })
}

    return (
    <div className='w-full bg-rose-600 text-white text-sm gap-x-2 justify-center flex items-center p-2 text-center 
    '>
        <p>This document is in the Archived folder</p>

<Button size='sm' onClick={onRestore}
variant='outline'
className='border-white bg-white hover:bg-emerald-500 text-emerald-500
 hover:text-white p-1 px-2 h-auto font-semibold hover:border-2'
>
    Restore document
</Button>

 



<ConfirmModal
onConfirm={onRemove}
>

    <Button size='sm' 
variant='outline'
className='border-white bg-white hover:bg-red-600
hover:border-2
hover:text-white
 text-red-500 p-1 px-2 h-auto font-semibold'
>
    Delete document
</Button>
</ConfirmModal>
 
 

    </div>
  )
}
