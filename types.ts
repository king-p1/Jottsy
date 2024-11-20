import {LucideIcon} from 'lucide-react'
import { Doc, Id } from './convex/_generated/dataModel'
import { IconType } from "react-icons/lib"
import { ReactNode } from 'react'


export interface ItemProps {
    label:string
    onClick?:()=>void
    Icon:LucideIcon | IconType
    id?:Id<"documents">
    documentIcon?:string
    active?:boolean
    expanded?:boolean
    isSearch?:boolean
    isNewDoc?:boolean
    isSetting?:boolean
    level?:number
    onExpand?:()=>void
}

export interface DocumentListProps{
    parentDocument?:Id<"documents">
    level?:number
    data?:Doc<"documents">[]
}

export interface DocNavProps{
    isCollapsed:boolean
    onResetWidth:()=>void

}
export interface IconPickerProps{
    asChild?:boolean
    onChange:(icon:string)=>void
    children:ReactNode

}

export interface TitleProps{
    initialData:Doc<"documents">

}

export interface TextEditorProps{
   editable?:boolean
   initialContent?:string
onChange:(value:string)=>void
}

export type SearchStoreType = {
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
    toggle:()=>void
}

export type CoverImageType = {
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
    url?:string
    onReplace : (url:string) => void
}

export type SettingsStoreType = {
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}