"use client"
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
 
import { TextEditorProps } from '@/types';
import { useTheme } from 'next-themes';
import { PartialBlock } from "@blocknote/core";
import { useEdgeStore } from "@/lib/edgestore";

 const TextEditor = ({onChange,editable,initialContent}:TextEditorProps) => {
    const {resolvedTheme} = useTheme()
    const {edgestore} = useEdgeStore()

    const handleUpload = async(file:File) =>{
        const res =  await edgestore.publicFiles.upload({
            file
        })

        return res.url
    }

    const editor = useCreateBlockNote({
        initialContent:initialContent 
        ? JSON.parse(initialContent) as PartialBlock[] 
        : undefined,
        uploadFile:handleUpload
    });
    
    return(
        <div className="p-4">
        <BlockNoteView
        className="custom-scrollbar"
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        onChange={() => onChange(JSON.stringify(editor.topLevelBlocks))}
        editable={editable}
        
/>
        </div>
    )
}

export default TextEditor