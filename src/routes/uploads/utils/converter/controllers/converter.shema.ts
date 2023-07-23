import { z } from 'zod'
import { fileScheme, uploadSchema } from '../../../controllers/uploads.schema'

export const fileToConverter = fileScheme.pick({
    filename: true
})
.merge(uploadSchema.pick({
    extention: true, 
    quality: true}))
export type fileToConvertType = z.infer<typeof fileToConverter>;