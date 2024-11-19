"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "../ui/button"
import { ImageIcon, X } from "lucide-react"
import { useCoverImage } from "@/hooks/use-cover-image"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { useEdgeStore } from "@/lib/edgestore"

export const CoverImage = ({url,preview}:{url?:string,preview?:boolean}) => {

    const {edgestore} = useEdgeStore()
    const params = useParams()
    const {onOpen,onReplace} = useCoverImage()
    const removeImg = useMutation(api.documents.deleteCoverImg)
    
    const handleRemove = async()=>{
      if(url){
       await edgestore.publicFiles.delete({
            url:url
        })
      }
        

removeImg({
    id:params.documentId  as Id<"documents">
})
toast.success('Cover image removed!')
    }

  return (
    <div
    className={cn('relative h-[35vh] group w-full',!url && 'h-[13vh]',url && '')}
    >
        {!!url && (
            <div>
                <Image
                src={url}
                className="object-cover"
                fill
              alt="cover"
                />
            </div>

        )}

        {url && !preview && (
            <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5
             flex items-center gap-x-2">
<Button
className="text-sm text-muted-foreground"
variant='outline'
    onClick={()=>onReplace(url)}
>
    <ImageIcon className="h-4 w-4"/>
    Change Image</Button>
<Button
className="text-sm text-muted-foreground"
variant='outline'
onClick={handleRemove}
>
    <X className="h-4 w-4"/>
    Remove Image</Button>
            </div>
        )}
    </div>
  )
}
