import { z } from "zod"
import { DeleteBoard } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Board } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof DeleteBoard>
export type ReturnType = ActionState<InputType, Board>