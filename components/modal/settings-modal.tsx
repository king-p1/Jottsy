"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useSettings } from "@/hooks/use-settings"
import { Label } from "../ui/label"
import { ModeToggle } from '../themes/theme-toggler'
  
export const SettingsModal = () => {
    const {isOpen,onClose} = useSettings()

return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent>
    <DialogHeader className='border-b pb-3'>
      <DialogTitle>My Settings</DialogTitle>
    </DialogHeader>
      
      <div className="flex items-center justify-between">
<div className="flex flex-col gap-y-1">
    <Label>Appearance</Label>
<span className="text-[0.8rem] text-muted-foreground">
    Customize your Jottsy&apos;s theme
</span>
</div>
<ModeToggle/>
      </div>
  </DialogContent>
</Dialog>
    )
  }
  