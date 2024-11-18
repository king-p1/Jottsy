"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar,  AvatarImage } from "@/components/ui/avatar"
import { SignOutButton, useUser } from "@clerk/clerk-react"
import { ChevronsLeftRight } from "lucide-react"
import { MdLogout } from "react-icons/md";

export const UserItem = () => {
 const {user} = useUser()

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role="button">
        <div className="gap-x-2 flex items-center w-3/4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user?.imageUrl}/>
          </Avatar>
          <span className="line-clamp-1">{user?.fullName}&apos;s Jottsy</span>
        </div>
        <ChevronsLeftRight className="rotate-90 ml-2 h-4 w-4 text-muted-foreground"/>
      </div>

    </DropdownMenuTrigger>

    <DropdownMenuContent
    className="w-80"
    alignOffset={11}
    forceMount
    align="start"
    >
      <div className="flex flex-col space-y-4 p-2">
        <p className="text-sm font-medium leading-none text-muted-foreground">
          {user?.emailAddresses[0].emailAddress}
        </p>
        <div className="gap-x-2 flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl}/>
          </Avatar>
          <span className="">{user?.fullName}&apos;s Jottsy</span>
        </div>
      </div>
      <DropdownMenuSeparator/>
      <DropdownMenuItem className="flex items-center gap-2">
        <MdLogout size={27}/>
        <SignOutButton >
          Sign out
        </SignOutButton>
      </DropdownMenuItem>
       </DropdownMenuContent>
  </DropdownMenu>
  
  )
}

