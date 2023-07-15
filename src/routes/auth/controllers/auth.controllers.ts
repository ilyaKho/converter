import { NextFunction, Request, Response } from "express"
import * as authService from './auth.service'
import {requestGoogleAccess as RequestGoogleAccess} from './middleware/verifyGoogleAccess'
export const requestGoogleAccess = async (req: Request, res: Response) => {
    try {
        const url = await RequestGoogleAccess()
        res.redirect(url)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = await authService.signIn(req.query.email as string)
        res.status(200).send(token)
    } catch (error) {
        next(error)
    }
}


