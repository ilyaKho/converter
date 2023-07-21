import { NextFunction, Request, Response } from "express";
import { AuthorizedRequestT } from '../../../types';
import { UploadT} from "../controllers/uploads.schema";

export const isJPGOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = (req as AuthorizedRequestT)
        const body = request.body as UploadT
        if (!request?.user?.authorized) {
            if (body.extention !== 'image/webp' || body.file.mimetype !== 'image/jpeg') {
                return res.status(401).json('Необходимо авторизоваться, чтобы иметь возможность выбирать другие форматы')
            }
        }
        return next()
    } catch (error) {
        next(error)
    }
}