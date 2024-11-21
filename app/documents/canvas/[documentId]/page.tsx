"use client";

import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash'; // Import debounce from lodash
 import { api } from '@/convex/_generated/api';
import {  useMutation, useQuery } from 'convex/react';
import { Id } from "@/convex/_generated/dataModel";
import { TbLoader3 } from 'react-icons/tb';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import errorImg from '@/public/second-404.png'
import { CoverImage } from '@/components/editor-components/cover-image'
import Image from "next/image"


const CanvasPage = ({params:{documentId}}:{
  params:{
    documentId:Id<"documents">
  }
}) => {
  const document = useQuery(api.documents.getById,{
    documentId:documentId
  })


  const Canvas = useMemo(()=>dynamic(()=> import ('@/components/canvas/canvas'),{ssr:false}),[])

  const [canvasData, setCanvasData] = useState([]); 

  useEffect(() => {
    if (document) {
      // Ensure canvasData is parsed correctly if it's a string
      setCanvasData(document.canvasData ? JSON.parse(document.canvasData) : []); // Load initial canvas data
    }
  }, [document]);

  

  const saveCanvasData = useMutation(api.documents.updateDoc)

  const onSaveCanvasData = () =>{
    saveCanvasData({
      id:documentId,
      canvasData: JSON.stringify(canvasData) // Convert to string before saving
    })
  }

  const debouncedSave = debounce(onSaveCanvasData, 1000); // Debounce save function

  const handleCanvasChange = (newElements) => { 
    setCanvasData(newElements);
    debouncedSave(); // Save data with debounce
  };

  if(document === undefined) {
    return(
      <div>
        <CoverImage.Skeleton/>
      <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
      <div className="pl-8 space-y-4 pt-4">
      <Skeleton className='h-4 w-[50%]'/>
      <Skeleton className='h-8 w-[80%]'/>
      <Skeleton className='h-12 w-[40%]'/>
      <Skeleton className='h-6 w-[60%]'/>
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

  if (!document) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <TbLoader3 size={45} className='animate-spin'/>
      </div>
    );
   }



  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Canvas 
      documentId={documentId}
      isArchived={document.isArchived}
      canvasData={canvasData} // Pass canvas data
      onChange={handleCanvasChange} // Pass change handler
       />
    </div>
  )
}

export default CanvasPage