"use client"

import { cn } from "@/lib/utils"
import { ItemProps } from "@/types"
import { ChevronDown, ChevronRight, Plus, Ellipsis } from "lucide-react"
import { MdKeyboardCommandKey } from "react-icons/md";
import { Skeleton } from "../ui/skeleton";
import React from "react";
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { PiTrashSimpleDuotone } from "react-icons/pi";
  import { useUser } from '@clerk/clerk-react'



export const Item = ({onClick,label,Icon,active,documentIcon,expanded,id,isSearch,level = 0,onExpand}:ItemProps) => {
    const router = useRouter()
    const {user} = useUser()

    const create = useMutation(api.documents.create)
    const archiveDoc = useMutation(api.documents.archiveDocs)

    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    const handleExpand = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        e.stopPropagation()
        onExpand?.()
    }

    const onCreate = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        e.stopPropagation()
        if(!id) return 
      const promise = create({
        title:'Untitled',
        parentDocument:id
      }).then((documentId)=>{
        if(!expanded){
            onExpand?.()
        }
router.push(`/documents/${documentId}`)
    })
    toast.promise(promise,{
        loading:'Creating a new document...',
        success:'New document created successfully!',
        error:'Failed to create new document.'
      })
    }
    
    const onArchive = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        e.stopPropagation()
        if(!id) return 
      const promise = archiveDoc({
        id
      }).then(()=>router.push(`/documents`))

    toast.promise(promise,{
        loading:'Archiving document...',
        success:'Document moved to archive!',
        error:'Failed to archive document.'
      })
    }



  return (
    <div onClick={onClick} role="button" style={{
        paddingLeft: level ? `${(level * 12) + 12}px` :'12px'
    }}
    className={cn("group min-h-[27px] text-sm py-1 w-full flex items-center text-muted-foreground pr-3 hover:bg-primary/5 font-medium",
        active && 'bg-primary/5 text-primary'
    )}
    >
        {!!id && (<div role="button"
         className="h-full rounded-sm hover:bg-neutral-300 mr-1 dark:hover:bg-neutral-600"
         onClick={handleExpand}
         >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground"/>
            </div>)}

            {documentIcon ? (<div className="shrink-0 mr-2 text-[18px]">
                {documentIcon}
            </div>) : 
       (<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>)
    }

       <span className="truncate">
        {label}
       </span>
        

        {isSearch && (<kbd className=" ml-auto pointer-events-none rounded border bg-muted h-7 select-none inline-flex px-1 gap-1 items-center text-muted-foreground font-medium text-[16px]">
            <span className="text-sm flex items-center justify-center ">
                Ctrl
                / 
                <MdKeyboardCommandKey size={17}/>
                </span>K
        </kbd>)}

    {!!id && (<div 
     className="ml-auto flex items-center gap-x-2"
     >
<DropdownMenu>
  <DropdownMenuTrigger asChild
  onClick={(e) => e.stopPropagation()}
  >
    <div className=" opacity-0 h-full ml-auto group-hover:opacity-100 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
role="button"
>
    <Ellipsis className="h-4 w-4 text-muted-foreground"/>
</div>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-60"
  side="right"
  forceMount
  align="start"
  >
    <DropdownMenuItem onClick={onArchive}>
        <PiTrashSimpleDuotone size={27} className="h-6 w-6 mr-2"/>
        Delete
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
    <div className="text-muted-foreground text-sm p-2 text-center">
        Last edited by: {user?.fullName} 
    </div>
  </DropdownMenuContent>
</DropdownMenu>

<div className=" opacity-0 h-full ml-auto group-hover:opacity-100 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
role="button"
onClick={onCreate}
>
    <Plus className="h-4 w-4 text-muted-foreground"/>
</div>
        </div>)}


        </div>
  )
}


Item.Skeleton = function ItemSkeleton ({level}:{level?:number}) {
return (
    <div
    style={{
        paddingLeft: level ? `${(level * 12) + 25}px` :'12px'
    }}
    className="flex gap-x-2 py-3"
    >
        <Skeleton className="h-4 w-4"/>
        <Skeleton className="h-4 w-[75%]"/>

    </div> 
)
}