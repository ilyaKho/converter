import { nanoid } from "nanoid"
import { queues, queuesPremium } from "../utils/filesQueue"
import { UploadT } from "./uploads.schema"
import { UnknownUserT, UserT } from "../../users/controllers/users.schema"

export const hasSubscription = (user: UserT) => {
    try {
        if (user.authorized && user.subscription && user.expires) return true
        else return false
    } catch (error) {
        throw error
    }
}

export const uploadService = async (dto: UploadT, user: UserT | UnknownUserT) => {
    try {
        let extention = dto.extention ? dto.extention : 'webp'
        let quality = '0'
        if (!dto.file?.filename) return ''
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg') {
            if (dto.quality) quality = dto.quality
        }

        const fileId = nanoid()
        const queuesPayload = {
            ...dto.file,
            ...user,
            fileId,
            extention,
            quality,
        }

        // const subscription = hasSubscription(user as UserT)       
        // let result
        // if (subscription) result = queuesPremium.addToQueue(queuesPayload)
        // else result = queues.addToQueue(queuesPayload)
       let  result = queuesPremium.addToQueue(queuesPayload)
        return result
    } catch (error) {
        throw error
    }
}