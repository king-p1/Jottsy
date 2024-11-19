import { create } from "zustand";

import {SearchStoreType} from '@/types'

export const useSearch = create <SearchStoreType>((set,get)=>({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen:false}),
    toggle:() => set({isOpen:!get().isOpen})

}))