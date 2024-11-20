"use client"
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery,useMutation } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams,useRouter } from 'next/navigation'
import { useState } from 'react'
import { TbLoader3 } from 'react-icons/tb'
import { toast } from 'sonner'
import { Input } from '../ui/input'
import { ConfirmModal } from '../modal/confirm-modal'

export const ArchivedBox = () => {
  const router = useRouter()
  const params = useParams()
  const documents = useQuery(api.documents.getArchivedDocs)
  const restore = useMutation(api.documents.restoreDoc)
  const deleteDocument  = useMutation(api.documents.deleteDoc)

const [search, setSearch] = useState('')

const filteredDocument = documents?.filter(({title,canvasData})=>{
  return title.toLowerCase().includes(search.toLowerCase()) && canvasData === undefined
})

const filteredCanvasBoard = documents?.filter(({title,canvasData})=>{
  return title.toLowerCase().includes(search.toLowerCase()) && canvasData !== undefined
})

const onClick = (documentId:string) => {
  router.push(`/documents/${documentId}`)
}

const onClickArchCan = (documentId:string) => {
  router.push(`/documents/canvas/${documentId}`)
}

const handleRestore = (e:React.MouseEvent<HTMLDivElement,MouseEvent>,documentId:Id<"documents">) =>{
  e.stopPropagation()
const promise = restore({
  id:documentId
}) 
toast.promise(promise,{
  loading:'Restoring archived document...',
  success:'Archived document restored!',
  error:'Failed to restore document.'
})
}

const handleDelete = (documentId:Id<"documents">) =>{
const promise = deleteDocument({
  id:documentId
}) 
toast.promise(promise,{
  loading:'Deleting document...',
  success:'Document has been deleted!',
  error:'Failed to delete document.'
})

if(params.documentId === documentId) {
  router.push('/documents')
}
}


if(documents === undefined){
  return(
    <div className='h-64 w-full flex justify-center items-center'>
    <TbLoader3 className='animate-spin' size={45}/>
</div>
  )
}

  return (
    <div className='text-sm'>
      
      <div className="flex items-center gap-x-1 p-2">
        <Search className='h-4 w-4 mr-1'/>
        <Input
        value={search}
        placeholder='Filter by title...'
        onChange={(e) => setSearch(e.target.value.trim())} // Trim input on change
        className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className='text-sm pb-2 hidden text-center text-muted-foreground last:block'>
          No documents or boards found
        </p>
        {filteredDocument?.map(({_id:id,title})=>(
          <div
          role='button'
          onClick={()=>onClick(id)}
          key={id}
          className='text-base rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
          >
<span className='truncate pl-2'>{title}</span>

<div className="flex items-center">

<div
onClick={(e)=>handleRestore(e,id)}
role='button'
className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
>
  <Undo className='h-4 w-4 mr-1 text-muted-foreground'/>

</div>

<ConfirmModal
onConfirm={()=>handleDelete(id)}
>
<div
role='button'
className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center justify-center'
>
  <Trash className='h-4 w-4  text-muted-foreground'/>

</div>
  </ConfirmModal>

</div>
          </div>
        ))}
       
        {filteredCanvasBoard?.map(({_id:id,title})=>(
          <div
          role='button'
          onClick={()=>onClickArchCan(id)}
          key={id}
          className='text-base rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
          >
<span className='truncate pl-2'>{title}</span>

<div className="flex items-center">

<div
onClick={(e)=>handleRestore(e,id)}
role='button'
className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
>
  <Undo className='h-4 w-4 mr-1 text-muted-foreground'/>

</div>

<ConfirmModal
onConfirm={()=>handleDelete(id)}
>
<div
role='button'
className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center justify-center'
>
  <Trash className='h-4 w-4  text-muted-foreground'/>

</div>
  </ConfirmModal>

</div>
          </div>
        ))}
      </div>
      </div>

  )
}
