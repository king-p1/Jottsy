"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { SingleImageDropzone } from "../ui/file-upload";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { TbLoader3 } from "react-icons/tb";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export const CoverImageModal = () => {
  const { isOpen, onClose,url } = useCoverImage();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const params = useParams()
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.updateDoc)
  
  const handleClose = () =>{
    setFile(undefined)
    setIsSubmitting(false)
    onClose()
  }

  const handleChange = async(file?:File)=>{
    if(file){
      setIsSubmitting(true)
      setFile(file)

const res = await edgestore.publicFiles.upload({
  file,
  options:{
    replaceTargetUrl:url
  },
    onProgressChange: (progress) => {
        <div>
          <TbLoader3 className="animate-spin" size={25}/>
        </div>
        console.log(progress);
      },
})




      await update({
        id:params.documentId as Id<"documents">,
        coverImage:res.url
      })
      toast.success('Image uploaded successfully!')
      handleClose()
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
          <SingleImageDropzone
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
          className="w-full outline-none"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
