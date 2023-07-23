import { AuthorizedRequestT } from '../../../types';
import { uploadService } from './uploads.service';
import { Request, Response } from "express";

export const uploadConroller = async (req: Request, res: Response) => {
    try {
        const user = (req as AuthorizedRequestT).user
        const result = await uploadService(
            { ...req.body, file: req.file },
            { ...user}
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}