import { create } from "zustand";

import {SettingsStoreType} from '@/types'

export const useSettings = create <SettingsStoreType>((set)=>({
    isOpen:false,
    onOpen:() => set({isOpen:true}),
    onClose:() => set({isOpen:false}),
}))