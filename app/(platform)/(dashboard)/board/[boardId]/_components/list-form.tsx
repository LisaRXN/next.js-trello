"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wraper";
import { RefObject, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";
import { useAction } from "@/hooks/use-actions";
import { toast } from "sonner";

export const ListForm = ({}) => {
  const params = useParams();
  const router = useRouter()

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSucces: (data) => {
        toast.success(`List "${data.title} created"`)
        disableEditing()
        router.refresh()
    },
    onError: (err) => {
        toast.error(err)
    }

  })

  const onSubmit = (formData:FormData) => {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({title, boardId})
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing);


  if (isEditing) {
    return (
      <ListWrapper>
        <form
        action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:board-input focus:border-input transition"
            placeholder="Enter a title"
          />
          <input 
            hidden 
            readOnly
            value={params?.boardId} 
            name="boardId" />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm "
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
