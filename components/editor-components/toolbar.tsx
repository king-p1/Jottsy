import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import { IconPicker } from "./icon-picker";
import { Button } from "../ui/button";
import { Image, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from 'react-textarea-autosize';

export const Toolbar = ({
  initialData,
  preview,
}: {
  initialData: Doc<"documents">;
  preview?: boolean;
}) => {
  const { icon,coverImage,content,title,_id:id } = initialData;

const inputRef = useRef<ElementRef<"textarea">>(null)
const [isEditing, setIsEditing] = useState<boolean>(true);
const [value, setValue] = useState(title);

const update = useMutation(api.documents.updateDoc)
const deleteIcon = useMutation(api.documents.deleteIcon)

const enableInputChange = () =>{
    if(preview) return 
    setIsEditing(true)
    
    setTimeout(() => {
        setValue(title)
        inputRef.current?.focus()
    }, 0);
}

const disableInput = () =>{setIsEditing(false)}

const onInput = (value:string) =>{
    setValue(value)
update({
    id:id,
    title: value || 'Untitled'
})
}

const onKeyDown=(e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
    if(e.key === 'Enter') {
        e.preventDefault()
        disableInput()
}}


const onIconSelect = (iconVal:string)=> {
update({
    id:id,
    icon:iconVal
})
}

const onRemoveIcon = ()=> {
    deleteIcon({
id:id
    })
}

  return (
    <div className="pl-[54px] group relative">
      {!!icon && !preview && (
        <p className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl transition hover:opacity-75">{icon}</p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 text-muted-foreground text-sm group-hover/icon:opacity-100 transition"
            onClick={onRemoveIcon}
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </p>
      )}

      {!!icon && preview && <p className="text-6xl pt-6">{icon}</p>}

      <div className="opacity-0 py-4 gap-x-1 flex items-center group-hover:opacity-100">
        {!icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 " /> Add Icon
            </Button>
          </IconPicker>
        )}

{!coverImage && !preview && (
    <Button 
    className="text-muted-foreground"
    variant='outline'
    size='sm'
    onClick={()=>{}}
    >
        <Image className="h-4 w-4"/>
    Add Cover Image
    </Button>
)}

      </div>


{isEditing && !preview ? (
        <TextareaAutosize
        ref={inputRef}
        value={value}
        onKeyDown={onKeyDown}
        onBlur={disableInput}
        onChange={(e)=>onInput(e.target.value)}
        className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />

) : (
    <div onClick={enableInputChange}
    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]" 
    >
{title}
    </div>
)}

    </div>
  );
};
