import * as fsProm from "fs/promises";
import * as path from 'path'
import { existsSync } from "fs";
import sharp from "sharp";
import { ConvertFileDto } from "./dto/convertFile.dto";
import { basePath } from "../../controllers/uploads.configs";


export const convert = async (dto: ConvertFileDto) => {
    try {        
        const extname = path.extname(dto.filename)
        const cleanName = dto.filename.replace(extname, '')
        const newFileName = cleanName + '.' + dto.extention
        if (newFileName === dto.filename) return path.join(basePath, dto.filename)
        
        const output_folder = path.join(basePath, cleanName + '.' + dto.extention)
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg' && dto.quality && dto.quality > 0) {
            await sharp(basePath+ dto.filename).jpeg({quality: Number(dto.quality)}).toFile(output_folder)
        }
        else await sharp(basePath + dto.filename).toFile(output_folder)  
        return output_folder
    } catch (error) {
        throw error
    }
}









