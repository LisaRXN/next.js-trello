import { z } from "zod"
import { CopyCard } from "./schema"
import { ActionState } from "@/lib/create-safe-action"
import { Card } from "@/lib/generated/prisma"

export type InputType = z.infer<typeof CopyCard>
export type ReturnType = ActionState<InputType, Card>