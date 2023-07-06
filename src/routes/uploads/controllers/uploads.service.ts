import { conterFilesFromDir } from "../../../converter/converterService"
import { UploadedFileDto } from "./dto/uploadedFile.dto"
import { basePath } from "./uploads.configs"

export const uploadService = async (dto: UploadedFileDto & {file: Express.Multer.File | undefined}) => {
    try {
        let extention = dto.extention ? dto.extention : 'webp'
        let quality = 0 
        if(!dto.file?.filename) return ''
        if (dto?.extention === 'jpeg' ||  dto?.extention === 'jpg' && dto?.quality) quality = dto.quality
        const file = await conterFilesFromDir({ fileName: dto.file.filename, pathFrom: basePath, pathTo: basePath, extention, quality })
        return file
    } catch (error) {
        throw error
    }
}