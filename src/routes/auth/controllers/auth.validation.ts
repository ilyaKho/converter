import { NextFunction, Request, Response } from "express";
import { z, ZodError } from 'zod'
import { signUpSchema } from "./auth.schema";
export const authValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = signUpSchema.parse({ ...req.body, file: req.file })
        return next()
    } catch (error) {
        if (error instanceof ZodError) return res.json(error)
        else return res.status(500).json({
            message: 'unknown error...'
        });
    }
}