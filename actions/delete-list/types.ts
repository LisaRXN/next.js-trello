import { z } from "zod"
import { DeleteList } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { List } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof DeleteList>
export type ReturnType = ActionState<InputType, List>