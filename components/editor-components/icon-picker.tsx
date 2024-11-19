"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useTheme } from "next-themes"
import EmojiPicker,{Theme}  from 'emoji-picker-react'

import React from 'react'
import { IconPickerProps } from "@/types"

export const IconPicker = ({children,onChange,asChild}:IconPickerProps) => {
  const {resolvedTheme} = useTheme()
  const curentTheme = (resolvedTheme || 'light' )as keyof typeof themeMap

  const themeMap = {
    'dark':Theme.DARK,
    'light':Theme.LIGHT
  }

  const theme = themeMap[curentTheme]
  
  return (
<Popover>
  <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
  <PopoverContent className="p-0 w-full border-none shadow-none">
<EmojiPicker
height={420}
theme={theme}
onEmojiClick={(data)=>onChange(data.emoji)}
/>
    </PopoverContent>
</Popover>
  )
}
