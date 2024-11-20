"use client"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { File } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState,useEffect } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { useSearch } from "@/hooks/use-search"
import { api } from "@/convex/_generated/api"

import React from 'react'

export const NewDocumentCommand = () => {
    const router = useRouter()
    const {user} = useUser()
    const documents = useQuery(api.documents.getSearchedDocs)
    const toggle = useSearch(({toggle})=>toggle)
    const isOpen = useSearch(({isOpen})=>isOpen)
    const onClose = useSearch(({onClose})=>onClose)
    // const onOpen = useSearch(({onOpen})=>onOpen)
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(()=>{
        const down = (e: KeyboardEvent) => {
            if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              toggle()
            }
          }
          document.addEventListener("keydown", down)
          return () => document.removeEventListener("keydown", down)
        }, [toggle])


    if(!isMounted) return null

    const onSelect=(id:string)=>{
        router.push(`/douments/${id}`)
        onClose()
    }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
    <CommandInput placeholder={`Search ${user?.firstName}'s Jottsy...`} />
    <CommandList>
      <CommandEmpty>No documents found.</CommandEmpty>
      <CommandGroup heading="Documents">
        {documents?.map(({_id:id,title,icon})=>(
            <CommandItem
            key={id}
            value={`${id}-${title}`}
            onSelect={onSelect}
title={title}
>
                {icon ? (
                    <p className="mr-2 h-4 w-4">
                        {icon}
                    </p>
                ) : (
                    <File className="mr-2 h-4 w-4"/>
                )}
                <span>{title}</span>
            </CommandItem>
        ))}
    
      </CommandGroup>
    </CommandList>
  </CommandDialog>

  )
}
