"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { DocNavProps } from '@/types'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { CiMenuFries } from "react-icons/ci";
import { Title } from './title'

export const DocNav = ({onResetWidth,isCollapsed}:DocNavProps) => {
const params = useParams()
const document = useQuery(api.documents.getById,{
  documentId:params.documentId as Id<"documents">
})

if(document === undefined) return <>Loading...</>
if(document === null) return null

  return (
    <nav className='bg-background px-3 py-2 w-full flex items-center gap-x-4 dark:bg-[1f1f1f] '>
      {isCollapsed && (
        <CiMenuFries 
        role='button'
        onClick={onResetWidth}
        className='text-muted-foreground h-6 w-6'
        />
      )}

<div className="flex items-center justify-between">
  <Title
  initialData={document}
  />
</div>

    </nav>
  )
}
