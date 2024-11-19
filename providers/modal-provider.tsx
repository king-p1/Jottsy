"use client"

import { SettingsModal } from "@/components/modal/settings-modal"
import { useEffect, useState } from "react"

import React from 'react'

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])
  
  if(!isMounted) return null
    return (
    <>
        <SettingsModal/>
    </>
  )
}


