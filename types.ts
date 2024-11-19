import {LucideIcon} from 'lucide-react'
import { Doc, Id } from './convex/_generated/dataModel'
import { IconType } from "react-icons/lib"


export interface ItemProps {
    label:string
    onClick?:()=>void
    Icon:LucideIcon | IconType
    id?:Id<"documents">
    documentIcon?:string
    active?:boolean
    expanded?:boolean
    isSearch?:boolean
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

export interface TitleProps{
    initialData:Doc<"documents">

}

export type SearchStoreType = {
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
    toggle:()=>void
}

export type SettingsStoreType = {
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}