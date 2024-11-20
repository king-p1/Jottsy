import { TitleProps } from "@/types";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { PiGlobeHemisphereWestDuotone } from "react-icons/pi";
import { Input } from "../ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { PiGlobeXFill } from "react-icons/pi";

export const PublishDoc = ({ initialData }: TitleProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.updateDoc);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const handlePublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing your document...",
      success: "Document published successfully!",
      error: "Failed to publish document.",
    });
  };

  const handleUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "UnPublishing your document...",
      success: "Document unpublished successfully!",
      error: "Failed to unpublish document.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button size='sm' variant='ghost' className="mt-2">
            {!initialData.isPublished && (<p>Publish</p>) }

{initialData.isPublished && (
    <div className="flex gap-2 items-center">
Doucment Published
    <PiGlobeHemisphereWestDuotone className="text-emerald-500 w-10 h-10 "/>
    </div>
)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
      className="w-72"
      align="end"
      alignOffset={8}
      forceMount
      >
        {initialData.isPublished ? (
    <div className="space-y-4">
        <div className="flex items-center gap-x-2">
        <PiGlobeHemisphereWestDuotone className="text-emerald-500 w-8 h-8 animate-pulse "/>
        <p className="text-base font-medium text-emerald-500 animate-pulse">
            This document is live.
        </p>
        </div>

        <div className="flex items-center">
            <Input
            value={url}
            className="flex-1 px-2 text-xs border rounded-l-md h-8"
            disabled
            />
            <Button
            className="h-8 rounded-l-none"
            variant='outline'
            disabled={copied}
            onClick={handleCopy}
            >
                {copied ? (
                    <CheckCircledIcon  className="h-5 w-5"/>
                ) : (
                    <Copy className="h-5 w-5"/>
                )}
            </Button>
        </div>
    </div>    
    ) : (
            <div className="flex flex-col items-center justify-center">
        <PiGlobeHemisphereWestDuotone className="text-muted-foreground w-8 h-8 mb-2"/>
<p className="mb-2 text-sm  font-medium">
    Publish this document
</p>

<span className="text-xs mb-4 text-muted-foreground">Share your document with others...</span>
    </div>
)}
        
        {initialData.isPublished ? (
        <Button size='sm' variant='ghost'
        className="text-xs w-full mt-3 flex items-center gap-2 text-rose-500 hover:text-red-400"
        disabled={isSubmitting}
        onClick={handleUnPublish}
        >
            <PiGlobeXFill className="h-7 w-7 "/>
            Unpublish
        </Button>
        ) 
: (
        <Button size='sm' variant='ghost'
        className="text-xs w-full mt-3 text-emerald-500 hover:text-emerald-400"
        disabled={isSubmitting}
        onClick={handlePublish}
        >
                    <PiGlobeHemisphereWestDuotone className=" w-7 h-7"/>
            Publish
        </Button>

)}
        
        </PopoverContent>
    </Popover>
  );
};
