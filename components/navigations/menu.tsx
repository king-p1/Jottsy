"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Ellipsis, Trash } from "lucide-react";
import { PiTrashSimpleDuotone } from "react-icons/pi";
import { Skeleton } from "../ui/skeleton";

export const Menu = ({ documentId }: { documentId: Id<"documents"> }) => {
  const router = useRouter();
  const { user } = useUser()
  const archive = useMutation(api.documents.archiveDocs);

  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document has been archived!",
      error: "Failed to archive document.",
    });
    router.push("/documents");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
      className="w-72"
      align="end"
      alignOffset={8}
      forceMount
      >
        <DropdownMenuItem
        onClick={onArchive}
        >
        <PiTrashSimpleDuotone size={27} className="h-6 w-6 "/>
        Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-muted-foreground text-sm p-2 text-center">
        Last edited by: {user?.fullName} 
    </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


Menu.Skeleton = function MenuSkeleton () {
    return (
            <Skeleton className="h-6 w-6 rounded-md "/>
    )
    }