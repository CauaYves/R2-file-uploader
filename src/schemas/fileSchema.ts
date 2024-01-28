import { z } from "zod"

const uploadBodySchema = z.object({
    name: z.string().min(1),
    contentType: z.string().regex(/\w+\/[-=.\w]+/)
})
const getFileParamsSchema = z.object({
    id: z.string().cuid(),
})
export { uploadBodySchema, getFileParamsSchema }