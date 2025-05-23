"use client"

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-actions";
import { PopoverClose } from "@radix-ui/react-popover";
import { MoreHorizontal, X  } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
    id: string;
}
export const BoardOptions = ( {id}: BoardOptionsProps) => {

    const { execute, isLoading } = useAction(deleteBoard,{
        onError: (error) => {
            toast.error(error)
        }
    });

const onDelete = () => {
    execute({id})
}

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3  bg-white shadow-md border-none" align="start" side="bottom">
                <div className="text-sm font-medium text-center text-neutral-600">
                    Board actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2" variant="ghost">
                        <X className="w-4 h-4"/>
                    </Button>
                </PopoverClose>
                <Button
                disabled={isLoading}
                variant="ghost"
                onClick={onDelete}
                className="rounded-none w-full h-auto p-2 px-5 font-normal text-sm">
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}