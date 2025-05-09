import { z } from "zod"
import { UpdateCardOrder } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Card } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>