import { z } from "zod"
import { UpdateBoard } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Board } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>