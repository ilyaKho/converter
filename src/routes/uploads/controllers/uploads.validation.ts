import { NextFunction, Request, Response } from "express";
import { z, ZodError } from 'zod'
import { schema } from "./uploads.schema";
export const uploadsValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = schema.parse({ ...req.body, file: req.file })
        return next(result)
    } catch (error) {
        if (error instanceof ZodError) return res.json(error)
        else return res.status(500).json({
            message: 'unknown error...'
        });
    }
}