"use client"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { useState,useEffect, useCallback } from "react"
import {
    CommandDialog,
    CommandInput,
  } from "@/components/ui/command"
 import { api } from "@/convex/_generated/api"

import React from 'react'
import { toast } from "sonner"

export const NewDocumentCommand = () => {
    const router = useRouter()
     
    const create = useMutation(api.documents.create)

   
    const handleCreate = useCallback(() => {
      const promise = create({
          title: 'Untitled'
      }).then((documentId) => router.push(`/documents/${documentId}`))
      
      toast.promise(promise, {
          loading: 'Creating a new document...',
          success: 'New document created successfully!',
          error: 'Failed to create document.'
      })
  }, [create, router])

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(()=>{
        const down = (e: KeyboardEvent) => {
            if (e.key === "i" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              handleCreate()
            }
          }
          document.addEventListener("keydown", down)
          return () => document.removeEventListener("keydown", down)
        }, [handleCreate])


    if(!isMounted) return null

   

  return (
    <CommandDialog >
    <CommandInput placeholder={`Create a new Jottsy...`} />
  </CommandDialog>

  )
}
