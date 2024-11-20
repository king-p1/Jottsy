import { api } from "@/convex/_generated/api";
import { TitleProps } from "@/types";
import { useMutation } from "convex/react";
import React, { useState,useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Menu } from "./menu";

export const Title = ({ initialData }: TitleProps) => {
  const { icon, title,_id:id } = initialData;

  const inputRef = useRef<HTMLInputElement>(null)
  const update = useMutation(api.documents.updateDoc);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState(title || 'Untitled');

const enableInputChange = () =>{
    setInputTitle(title)
    setIsEditing(true)

    setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(0,inputRef.current.value.length)
    }, 0);
}

const disableInput = () =>{setIsEditing(false)}

const onChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
setInputTitle(e.target.value)
update({
    id:id,
    title:e.target.value || 'Untitled'
})
}

const onKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === 'Enter') disableInput()
}

  return (
    <div className="flex items-center gap-x-1 ">
      {!!icon && <p>{icon}</p>}
      {isEditing ? (
        <Input 
        ref={inputRef}
        onBlur={disableInput}
        value={inputTitle}
        onClick={enableInputChange}
        onKeyDown={onKeyDown}
        onChange={onChange}
        className="h-7 px-2 focus-visible:ring-transparent" />
      ) : (
        <Button
          variant="ghost"
          onClick={enableInputChange}
          className="h-auto p-1 font-medium"
        >
          <span className="truncate">{title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton ({level}:{level?:number}) {
    return (
        <div className="w-full">
        <div className="flex justify-center items-center gap-2">
            <Skeleton className="h-6 w-40 rounded-md "/>
            <Menu.Skeleton/>
        </div>
        </div>
    )
    }
