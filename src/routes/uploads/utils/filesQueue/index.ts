import { queueType } from "./fileQueue.schema";
import { convert } from "../converter/converterService";
import { status } from "../../../../types";
export interface iFiles extends queueType {
    status: status
}


class Queues {
    private inProccessing: queueType[] =[]
    private inQueue: queueType[]=[]
    private limit = 3
    private files: iFiles[] = []
    constructor() {
       
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
        return { fileName: file.filename, fileId: file.fileId, status }
    }
    async runProccess(file: queueType) {
        let result: string = await new Promise((resolve, reject) => {
            setTimeout(async () => resolve(await convert({...file})), 50000)
        })
        this.changeStatus('Готово', file.fileId)
        this.removeFromProccessing(file.fileId)
        this.tranferFromQueue()
        return result
    }

    tranferFromQueue() {
        if(this.inQueue.length){
            this.inProccessing.push(this.inQueue[0])
            this.runProccess(this.inQueue[0])
            this.inQueue.shift()
        }        
        return this.inQueue
    }
    removeFromProccessing(fileId: string) {
        let queue = this.inProccessing.filter(el => el.fileId !== fileId)
        this.inProccessing = queue
        return this.inProccessing
    }
    changeStatus(status: status, fileId: string) {
        this.files = this.files.map(el => {
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
