import { NextFunction, Request, Response } from "express"
import * as authService from './auth.service'

export const requestGoogleAccess = async (req: Request, res: Response) => {
    try {
        const url = await authService.requestGoogleAccess()
        res.redirect(url)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const verifyGoogleAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await authService.verifyGoogleAccess(req.query.code as string)
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send('Заглушка для авторизации')
    } catch (error) {
        next(error)
    }
}


