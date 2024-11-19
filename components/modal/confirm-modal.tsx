"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

  
export const ConfirmModal = ({children,onConfirm}:{
    children:ReactNode,onConfirm:()=>void
}) => {

    const handleConfirm = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) =>{
e.stopPropagation()
onConfirm()

    }

  return (
    <AlertDialog>
    <AlertDialogTrigger
    onClick={(e)=>e.stopPropagation()}
    >
        {children}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your document
          and remove your data from our database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel     
        onClick={(e)=>e.stopPropagation()}
        >Cancel</AlertDialogCancel>

        <AlertDialogAction
            onClick={handleConfirm}
        >Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}
