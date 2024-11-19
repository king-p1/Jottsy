"use client"
import { CoverImage } from '@/components/editor-components/cover-image'
import { Toolbar } from '@/components/editor-components/toolbar'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'

const DocumentIdPage = ({params:{documentId}}:{
  params:{
    documentId:Id<"documents">
  }
}) => {

const document = useQuery(api.documents.getById,{
  documentId:documentId
})


if(document === undefined) return <>Loading..</>

if(document === null) return <>Not found..</>

  return (
    <section className='pb-40'>
     <CoverImage url={document.coverImage}/>
     
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document}/>
      </div>
      
      </section>
  )
}

export default DocumentIdPage