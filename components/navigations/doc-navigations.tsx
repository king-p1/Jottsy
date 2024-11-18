"use client"
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { CiMenuFries } from "react-icons/ci";
import { UserItem } from './user-item'

export const DocNavigations = () => {
  
  const pathName = usePathname()

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  
  const isMobile = useMediaQuery('(max-width: 768px)')
const [isResetting, setIsResetting] = useState(false)
const [isCollapsed, setIsCollapsed] = useState(isMobile)

useEffect(()=>{
  if(isMobile){
    collapseSidebar()
  }else{
    resetWidth()
  }
},[isMobile])

useEffect(()=>{
  if(isMobile){
    collapseSidebar()
  }
},[isMobile,pathName])

const handleMouseDown = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
  e.preventDefault()
  e.stopPropagation()
  
  isResizingRef.current = true
  document.addEventListener("mousemove", handleMouseMove)
  document.addEventListener("mouseup", handleMouseUp)
  
}

const handleMouseMove = (e:MouseEvent) =>{
  if(!isResizingRef.current) return
  let newWidth = e.clientX
  
  // limits for the width
  if(newWidth < 240) newWidth = 240
  if(newWidth > 480) newWidth = 480
  
  if(sidebarRef.current && navbarRef.current){
    sidebarRef.current.style.width = `${newWidth}px`
    navbarRef.current.style.setProperty('left',`${newWidth}px`)
    navbarRef.current.style.setProperty('width',`calc(100% - ${newWidth}px)`)
  }

}
const handleMouseUp = () =>{
isResizingRef.current = false
document.removeEventListener("mousemove", handleMouseMove)
document.removeEventListener("mouseup", handleMouseUp)
}

const resetWidth = () =>{
if(sidebarRef.current && navbarRef.current){
  setIsCollapsed(false)
  setIsResetting(true)
  
  sidebarRef.current.style.width = isMobile ? '100%' : '240px'
  navbarRef.current.style.setProperty('width',isMobile ? '0' : 'calc(100% - 240px)')
  navbarRef.current.style.setProperty('left',isMobile ? '100%' : '240px')

setTimeout(() => {
  setIsResetting(false)
}, 300);

}

}

const collapseSidebar = () =>{
  if(sidebarRef.current && navbarRef.current){
    setIsCollapsed(true)
    setIsResetting(true)
    
    sidebarRef.current.style.width = '0'
    navbarRef.current.style.setProperty('width','100%')
    navbarRef.current.style.setProperty('left','0')
  
  setTimeout(() => {
    setIsResetting(false)
  }, 300);
  
  }
}

  return (
    <>
    <aside className={cn('group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 z-[99999] flex-col', isResetting && 'transition-all ease-in-out duration-300',isMobile&& 'w-0')}
    ref={sidebarRef}
    >
   
<div
role='button'
onClick={collapseSidebar}
className={cn("h-6 w-6 text-muted-foreground rounded-sm absolute top-3 right-2 opacity-0 transition hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover/sidebar:opacity-100", isMobile && 'opacity-100')}>
  <ChevronLeft className="h-6 w-6"/>
</div>

   <div className="">
    <UserItem/>
   </div>

<div className="mt-4">
  <p>Documents</p>
</div>

<div className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full absolute w-1 bg-primary/10 right-0 top-0'
onMouseDown={handleMouseDown}
onClick={resetWidth}
/>

      </aside>

<div className={cn("absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",isResetting && 'transition-all ease-in-out duration-300' , isMobile && 'left-0 w-full')} ref={navbarRef}>

<nav className='py-2 px-3 w-full bg-transparent'>
  {isCollapsed && (<CiMenuFries onClick={resetWidth} role='button' className='font-semibold h-6 w-6 text-muted-foreground'/>)}
</nav>

</div>

      </>

  )
}
