import { queueType } from "./fileQueue.schema";
import { convert } from "../converter/converterService";
import { status } from "../../../../types";
export interface iFiles extends queueType {
    status: status
}


class Queues {
    private instance: Queues
    private inProccessing: queueType[]
    private inQueue: queueType[]
    private limit = 3
    private files: iFiles[] = []
    constructor() {
        if (!this.instance) {
            this.instance = new Queues()
        }
        return this.instance
    }
    addToQueue(file: queueType) {
        let status = '' as status
        if (this.inProccessing.length < this.limit) {
            this.inProccessing.push(file)
            this.runProccess(file)
            status = 'В процессе обработки'
        }
        else {
            this.inQueue.push(file)
            status = 'Добавлено в очедерь'
        }
        this.files.push({ ...file, status })
        this.changeStatus(status, file.fileId)
        return { fileName: file.filename, fileId: file.fileId, status }
    }
    async runProccess(file: queueType) {
        let result = await new Promise((resolve, reject) => {
            setTimeout(async () => resolve(await convert({...file})), 3000)
        })
        this.changeStatus('В процессе обработки', file.fileId)
        this.removeFromProccessing(file.fileId)
        return result
    }

    tranferFromQueue() {
        this.inProccessing.push(this.inQueue[0])
        this.inQueue.shift()
        return this.inQueue
    }
    removeFromProccessing(fileId: string) {
        let queue = this.inProccessing.filter(el => el.fileId !== fileId)
        this.inProccessing = queue
        return this.inProccessing
    }
    changeStatus(status: status, fileId: string) {
        this.files.map(el => {
            if (el.fileId === fileId) {
                el.status = status
                return el
            }
            return el
        })
    }
    getFileList(){
        return this.files
    }
}

export const queues = new Queues()
