import * as fsProm from "fs/promises";
import * as path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import { existsSync } from "fs";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath.path);
import sharp from "sharp";
import { ConvertFileDto } from "./dto/convertFile.dto";
export const getFileListFromDir = async (path: string) => {
    try {
        let file_list = await fsProm.readdir(path)
        return file_list
    } catch (error) {
        throw error
    }
}
const convert = async (dto: ConvertFileDto) => {
    try {
        const fileName = dto.fileName
        const extname = path.extname(fileName)
        const cleanName = fileName.replace(extname, '')
        const newFileName = cleanName + '.' + dto.extention
        if (newFileName === fileName) return path.join(dto.pathFrom, fileName)
        
        const output_folder = path.join(dto.pathTo, cleanName + '.' + dto.extention)
        if (dto?.extention === 'jpeg' || dto?.extention === 'jpg' && dto.quality && dto.quality > 0) {
            await sharp(dto.pathFrom + fileName).jpeg({quality: Number(dto.quality)}).toFile(output_folder)
        }
        else await sharp(dto.pathFrom + fileName).toFile(output_folder)  
        return output_folder
    } catch (error) {
        throw error
    }
}

export const conterFilesFromDir = async (dto: ConvertFileDto) => {
    try {
        let from = path.join(dto.pathFrom)
        let to = path.join(dto.pathTo)
        let existFrom = existsSync(from)
        let existTo = existsSync(to)
        if (!existFrom || !existTo) return 'Нет директории для ковертации картинок'
        const file = await convert(dto)
        return file

    } catch (error) {
        throw error
    }
}







