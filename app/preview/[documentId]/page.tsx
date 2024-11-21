/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { CoverImage } from '@/components/editor-components/cover-image'
import { Toolbar } from '@/components/editor-components/toolbar'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import errorImg from '@/public/second-404.png'
import React, { useEffect, useMemo, useState } from 'react'
import { debounce } from 'lodash'


const Preview = ({params:{documentId}}:{
  params:{
    documentId:Id<"documents">
  }
}) => {


  const TextEditor = useMemo(()=>dynamic(()=> import ('@/components/editor-components/text-editor'),{ssr:false}),[])
  const Canvas = useMemo(()=>dynamic(()=> import ('@/components/canvas/canvas'),{ssr:false}),[])

const document = useQuery(api.documents.getById,{
  documentId:documentId
})

const [canvasData, setCanvasData] = useState([]); 

  useEffect(() => {
    if (document) {
      const parsedData = document.canvasData ? JSON.parse(document.canvasData) : [];
      setCanvasData(parsedData); // Load initial canvas data
    }
  }, [document]);

  

  const saveCanvasData = useMutation(api.documents.updateDoc)

  const onSaveCanvasData = () =>{
    saveCanvasData({
      id:documentId,
      canvasData: JSON.stringify(canvasData) // Convert to string before saving
    })
  }

  const debouncedSave = debounce(onSaveCanvasData, 1000);



const update = useMutation(api.documents.updateDoc)

const handleChange = (content:string) =>{
  update({
    id:documentId,
    content
  })
}


if(document === undefined) {
  return(
    <div>
      <CoverImage.Skeleton/>
    <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
    <div className="pl-8 space-y-4 pt-4">
      <Skeleton className='h-4 w-[50%]'/>
      <Skeleton className='h-6 w-[80%]'/>
      <Skeleton className='h-10 w-[40%]'/>
      <Skeleton className='h-12 w-[60%]'/>
    </div>
    </div>
    </div>
  )
}

if(document === null) {
  // use a picture from storyset for the error
  return (<>
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

        </div>  </>)}

  return (
    <>
    <main className='pb-40'>
     <CoverImage preview url={document.coverImage}/>
     
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl h-full ">
        <Toolbar preview initialData={document}/>
        <TextEditor
        editable={false}
        onChange={handleChange}
        initialContent={document.content}
        />

      </div>
<div className="w-full flex items-center justify-center h-full">

      <div className="h-[600px] w-[90%] ">
        {document.canvasData  && (
          <Canvas
          documentId={documentId}
          onChange={()=>{}}
          isNulled={true}
          canvasData={canvasData}
          />
        )}
      </div>
          </div>
      </main>
    </>
  )
}

export default Preview