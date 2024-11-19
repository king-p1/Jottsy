import { api } from "@/convex/_generated/api";
import { TitleProps } from "@/types";
import { useMutation } from "convex/react";
import React, { useState,useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Title = ({ initialData }: TitleProps) => {
  const { icon, title,_id:id } = initialData;

  const inputRef = useRef<HTMLInputElement>()
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

  return (
    <div className="flex items-center gap-x-1">
      {!!icon && <p>{icon}</p>}
      {isEditing ? (
        <Input className="h-7 px-2 focus-visible:ring-transparent" />
      ) : (
        <Button
          variant="ghost"
          onClick={() => {}}
          className="h-auto p-1 font-medium"
        >
          <span className="truncate">{title}</span>
        </Button>
      )}
    </div>
  );
};
