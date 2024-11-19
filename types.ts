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