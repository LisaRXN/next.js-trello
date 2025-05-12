"use client"

import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useAction } from "../../hooks/use-actions"
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { X } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end" 
    sideOffset?: number;

}
export const FormPopover = (
    {
        children,
        side = "bottom",
        align,
        sideOffset = 0,
    }: FormPopoverProps) => {

        const proModal = useProModal();
        const closeRef= useRef<HTMLButtonElement>(null)
        const router = useRouter()

        const { execute, fieldErrors } = useAction(createBoard, {
            onSucces: (data) => {
                toast.success('Board created !')
                closeRef.current?.click()
                router.push(`/board/${data.id}`)
            },
            onError: (error) => {
                toast.error(error);
                proModal.onOpen();
            }
        });

        const onSubmit = (formData: FormData) => {
            const title = formData.get('title') as string;
            const image = formData.get('image') as string

            execute({title, image})

        }
    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
            align={align}
            className="w-80 pt-3 border-none shadow-md bg-white"
            side={side}
            sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto p-2 absolute top-1 right-1 hover:bg-zinc-50">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker
                        id="image"
                        errors={fieldErrors}
                        />
                        <FormInput
                        id="title"
                        label="Board title"
                        type="text"
                        errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full" variant="destructive">
                        Create
                    </FormSubmit>
                </form>

            </PopoverContent>
        </Popover>
    )

}