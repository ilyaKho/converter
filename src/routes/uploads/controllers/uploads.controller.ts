import { uploadService } from './uploads.service';
import { Request, Response } from "express";
import { TypedRequest } from "../../types";

export const uploadConroller = async (req: Request, res: Response) => {
    try {
       const result = await uploadService({...req.body, file: req.file})
       res.status(200).download(result)
    } catch (error) {
        res.status(500).json(error)
    }
}