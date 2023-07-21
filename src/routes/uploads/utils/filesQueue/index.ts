import { Queue, QueueWithStatus } from "./fileQueue.schema";
import { Status } from "../../../../types";
import { convert } from "../converter/controllers/converterService";
import { exec } from "child_process";
import path, { resolve } from "path";
import { error } from "console";


export class Files {
    private files: QueueWithStatus[] = []
    addFile(file: QueueWithStatus) {
        this.files.push(file)
        return this.files
    }
    changeStatus(status: Status, fileId: string) {
        this.files = this.files.map(el => {
            if (el.fileId === fileId) {
                el.status = status
                return el
            }
            return el
        })
    }
    getFiles(){
        return this.files
    }
}
export class QueuesSevice {
    private inProccessing: Queue[] = []
    private inQueue: Queue[] = []
    private limit = 3
    queues: Files
    constructor(files: Files) {
        this.queues = files
    }
    addToQueue(file: Queue) {
        let status = '' as Status
        if (this.inProccessing.length < this.limit) {
            this.inProccessing.push(file)
            this.runProccess(file)
            status = 'В процессе обработки'
        }
        else {
            this.inQueue.push(file)
            status = 'Добавлено в очедерь'
        }
        this.queues.addFile({ ...file, status })
        return { fileName: file.filename, fileId: file.fileId, status }
    }
    async runProccess(file: Queue) {
        let result: string = await new Promise((resolve, reject) => {
            setTimeout(async () => resolve(await convert({ ...file })), 50000)
        })
        this.changeStatus('Готово', file.fileId!)
        this.removeFromProccessing(file.fileId!)
        this.tranferFromQueue()
        return result
    }

    tranferFromQueue() {
        if (this.inQueue.length) {
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
    changeStatus(status: Status, fileId: string) {
        this.queues.changeStatus(status, fileId)
    }
    getFileList() {
        return this.queues.getFiles()
    }
}
class PremiumQueues extends QueuesSevice {
    constructor(files: Files) {
        super(files)
    }
    addToQueue(file: Queue) {
        const status: Status = 'В процессе обработки'
        this.queues.addFile({ ...file, status })
        this.runProccess(file)
        return { fileName: file.filename, fileId: file.fileId, status }
    }
    async runProccess(file: Queue) {
        let converterPath = ''
        let command = `node `
        const params = `${file.filename} ${file.extention} -q ${file.quality}`
        if (process.env.START_TYPE === 'DEV') {
            converterPath = path.join(__dirname, '../', 'convert', 'index.ts')
            command = `ts-node converterPath ${params}`
        }
        else {
            converterPath = path.join(__dirname, '../', 'convert', 'index.js')
            command = `node converterPath ${params}`
        }

        const result: string =  await new Promise((resolve, reject) => {
             exec(command, (error, stdout, stderr)=>{
                if(error) reject(error)
                else if(stderr) reject(error)
                else {
                    console.log(stdout)
                    resolve(stdout.trim())}
             })
        })
        return result
    }
}
export const files = new Files()
export const queues = new QueuesSevice(files)
export const queuesPremium = new PremiumQueues(files)
