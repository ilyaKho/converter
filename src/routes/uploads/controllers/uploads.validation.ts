import { NextFunction, Request, Response } from "express";
import { ZodError } from 'zod'
import { uploadSchema } from "./uploads.schema";
export const uploadsValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = uploadSchema.parse({ ...req.body, file: req.file })
        return next()
    } catch (error) {
        if (error instanceof ZodError) return res.json(error)
        else return res.status(500).json({
            message: 'unknown error...'
        });
    }
}