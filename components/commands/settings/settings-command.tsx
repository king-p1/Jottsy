/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState,useEffect } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
     CommandList,
  } from "@/components/ui/command"
import React from 'react'
import { useSettings } from "@/hooks/use-settings"

export const SettingsCommand = () => {
    const isOpen = useSettings(({isOpen})=>isOpen)
    const onOpen = useSettings(({onOpen})=>onOpen)
    const onClose = useSettings(({onClose})=>onClose)
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(()=>{
        const down = (e: KeyboardEvent) => {
            if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              onOpen()
            }
          }
          document.addEventListener("keydown", down)
          return () => document.removeEventListener("keydown", down)
        }, [onOpen])


    if(!isMounted) return null

  return (
    <CommandDialog>
    <CommandInput placeholder={`Your Jottsy settings`} />
    <CommandList>
      <CommandEmpty>No documents found.</CommandEmpty>
      <CommandGroup heading="Documents">
        
        
    
      </CommandGroup>
    </CommandList>
  </CommandDialog>

  )
}
