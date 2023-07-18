import { nanoid } from "nanoid"
import { convert } from "../utils/converter/converterService"
import { queues } from "../utils/filesQueue"
import { basePath } from "./uploads.configs"
import { uploadType } from "./uploads.schema"
import { iUser } from "../../../types"

export const uploadService = async (dto: uploadType, user?: iUser) => {
    try {
        let extention = dto.extention ? dto.extention : 'webp'
        let quality = 0
        if (!dto.file?.filename) return ''
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg') {
            if (dto.quality) quality = Number(dto.quality)
        }
        const fileId = nanoid()
        let userId = ''
        if(user) userId = user.user_id
        
        let result = queues.addToQueue(
            {
                ...dto.file,
                fileId,
                extention,
                quality,
                userId
            }
        )
        return result
    } catch (error) {
        throw error
    }
}