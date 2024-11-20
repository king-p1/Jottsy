"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { DocNavProps } from '@/types'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { CiMenuFries } from "react-icons/ci";
import { Title } from './title'
import { Banner } from './banner'
import { Menu } from './menu'
import { PublishDoc } from './publish-doc'

export const DocNav = ({onResetWidth,isCollapsed}:DocNavProps) => {
const params = useParams()
const document = useQuery(api.documents.getById,{
  documentId:params.documentId as Id<"documents">
})

if(document === undefined) {
  return (
<nav className='bg-background px-3 py-2 w-full flex items-center dark:bg-[#1f1f1f] '>
<Title.Skeleton/>

</nav>
)}

if(document === null) return null

  return (
    <>
  {document.isArchived && (
    <Banner documentId={document._id}/>
  )}
    <nav className='bg-background  pb-2 w-full flex flex-col items-center gap-x-4 dark:bg-[#1f1f1f] '>

<div className="flex items-center justify-start gap-3">

  {isCollapsed && (
    <CiMenuFries 
    role='button'
    onClick={onResetWidth}
    className='text-muted-foreground h-6 w-6 font-bold text-black'
    />
  )}
<div className="flex items-center justify-between w-full">
  <Title
  initialData={document}
  />

  <div className="flex items-center gap-x-2">
  <Menu documentId={document._id}/>
    <PublishDoc
      initialData={document}
    />
  </div>
  
</div>
  </div>


    </nav>
    </>

  )
}


