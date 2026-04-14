import { z } from "zod/v3"
export const assessmentSchema = z.object({
  careRecipientName: z.string().min(1),
})
