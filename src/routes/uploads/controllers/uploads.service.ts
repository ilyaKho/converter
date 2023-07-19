import { nanoid } from "nanoid"
import { convert } from "../utils/converter/converterService"
import { Queues, queues } from "../utils/filesQueue"
import { basePath } from "./uploads.configs"
import { uploadType } from "./uploads.schema"
import { iUser } from "../../../types"
import { queueType } from "../utils/filesQueue/fileQueue.schema"

export const hasSubscription = (user: iUser) => {
    try {
        if (user.authorized && user.subscription && user.expires) return true
        else return false
    } catch (error) {
        throw error
    }
}

export const uploadService = async (dto: uploadType, user: iUser) => {
    try {
        let extention = dto.extention ? dto.extention : 'webp'
        let quality = 0
        if (!dto.file?.filename) return ''
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg') {
            if (dto.quality) quality = Number(dto.quality)
        }
        const fileId = nanoid()
       
        const subscription = hasSubscription(user)
        const queuesPayload = {
            ...dto.file,
            ...user,
            fileId,
            extention,
            quality,
        }
        if (subscription) {
            const premiumQueues = new Queues()
            let result = premiumQueues.addToQueue(queuesPayload)
            return result
        }
        else {
            let result = queues.addToQueue(queuesPayload)
            return result
        }

    } catch (error) {
        throw error
    }
}