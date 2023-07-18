import { NextFunction, Request, Response } from "express";
import { authorizedRequest, iUser } from '../../../types';
import { nanoid } from 'nanoid';
import { uploadType } from "../controllers/uploads.schema";

export const isJPGOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = (req as authorizedRequest)
        const body = request.body as uploadType
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