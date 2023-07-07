import { conterFilesFromDir } from "../../../converter/converterService"
import { basePath } from "./uploads.configs"
import { uploadType } from "./uploads.schema"

export const uploadService = async (dto: uploadType) => {
    try {
        let extention = dto.extention ? dto.extention : 'webp'
        let quality = 0
        if (!dto.file?.filename) return ''
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg') {
            if (dto.quality) quality = Number(dto.quality)
        }
        const file = await conterFilesFromDir({ fileName: dto.file.filename, pathFrom: basePath, pathTo: basePath, extention, quality })
        return file
    } catch (error) {
        throw error
    }
}