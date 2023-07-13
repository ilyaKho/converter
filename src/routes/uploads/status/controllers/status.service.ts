import { Request, Response } from "express"
import { queues } from "../../utils/filesQueue"

export const getStatus = (token: string, timeout: number)=>{
    try {
        let fileData = queues.getFileList().filter(file=> file.fileId === token)
        return fileData
    } catch (error) {
        throw error
    }
}
