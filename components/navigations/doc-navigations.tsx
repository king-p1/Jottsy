import React from 'react'

export const DocNavigations = () => {
  return (
    <aside className='group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 z-[99999] flex-col'>
   
   <div className="">
    <p>Action Items</p>
   </div>

<div className="mt-4">
  <p>Documents</p>
</div>

<div className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full absolute w-1 bg-primary/10 right-0 top-0'/>

      </aside>
  )
}
