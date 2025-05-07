import { z } from "zod"
import { UpdateList } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { List } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>