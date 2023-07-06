import { uploadService } from './uploads.service';
import { Response } from "express";
import { UploadedFileDto } from "./dto/uploadedFile.dto";
import { TypedRequest } from "../../types";

export const uploadConroller = async (req: TypedRequest.Body<UploadedFileDto>, res: Response) => {
    try {
       const result = await uploadService({...req.body, file: req.file})
       res.status(200).download(result)
    } catch (error) {
        res.status(500).json(error)
    }
}