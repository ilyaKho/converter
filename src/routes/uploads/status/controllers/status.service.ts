import { queues } from "../../utils/filesQueue"
import { QueueWithStatus } from "../../utils/filesQueue/fileQueue.schema"

export const getStatus = async (fileId: string, timeout: number=1000)=>{
    try {
        if(timeout < 1000) timeout = 1000
        const file = await new Promise((resolve, reject)=>{
            let fileData = queues.getFileList().filter(file=> file.fileId === fileId)
            setTimeout(()=>resolve(fileData), timeout)
        })
        return file as QueueWithStatus
    } catch (error) {
        throw error
    }
}
