"use client"
import { api } from '@/convex/_generated/api'
import { DocumentListProps } from '@/types'
import { useQuery } from 'convex/react'
import { useParams,useRouter } from 'next/navigation'
import { useState } from 'react'
import { Item } from './item'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'


export const DocumentList = ({data,level = 0,parentDocument}:DocumentListProps) => {
    const router = useRouter()
    const params = useParams()
    const documents = useQuery(api.documents.getSidebarDocs,{
        parentDocument:parentDocument
    })

const [expanded, setExpanded] = useState<Record<string,boolean>>({})

const onExpand = (documentId:string) =>{
    setExpanded(
        prev => ({
            ...prev,[documentId]: !prev[documentId]
        })
    )
}
const onRedirect = (documentId:string) =>{
    router.push(`/documents/${documentId}`)
}
if(documents === undefined){
    return (<>
        <Item.Skeleton level={level}/>
    {level === 0 && (
        <>
        <Item.Skeleton level={level}/>
        <Item.Skeleton level={level}/>
        </>

    )}
    </>
    )
}

return (
    <>
    <p 
    className={cn('hidden text-sm text-muted-foreground font-medium',
        expanded && 'last:block', level === 0 && 'hidden'
    )}
    style={{
        paddingLeft: level ? `${(level * 12) + 25}px` : undefined
    }}
    >
        No pages here
    </p>

{documents.map(({_id:id,isArchived,isPublished,title,icon,userId})=>(
    <div key={id}>
<Item
id={id}
onClick={()=>onRedirect(id)}
label={title}
documentIcon={icon}
active={params.documentId === id}
level={level}
onExpand={()=>onExpand(id)}
expanded={expanded[id]}
Icon={FileIcon}
/>

{/* recursively calling the component */}
{expanded[id] && (
    <DocumentList
    parentDocument={id}
    level={level+1}
    />
)}
    </div>
))}

    </>
  )
}
