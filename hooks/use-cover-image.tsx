import { create } from "zustand";

import {CoverImageType} from '@/types'

export const useCoverImage= create <CoverImageType>((set)=>({
    url:undefined,
    isOpen:false,
    onOpen:() => set({isOpen:true,url:undefined}),
    onClose:() => set({isOpen:false,url:undefined}),
    onReplace:(url:string) => set({isOpen:true,url}),

}))