"use client";

import { useEffect, useState } from 'react';
import { debounce } from 'lodash'; // Import debounce from lodash
import { Canvas } from '@/components/canvas/canvas'
import { api } from '@/convex/_generated/api';
import {  useMutation, useQuery } from 'convex/react';
import { Id } from "@/convex/_generated/dataModel";
import { TbLoader3 } from 'react-icons/tb';

const CanvasPage = ({params:{documentId}}:{
  params:{
    documentId:Id<"documents">
  }
}) => {
  const document = useQuery(api.documents.getById,{
    documentId:documentId
  })
  const [canvasData, setCanvasData] = useState([]); // Ensure this is an array

// const {} = document

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