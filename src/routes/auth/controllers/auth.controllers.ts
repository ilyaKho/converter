import { Request, Response } from "express"
import * as authService from './auth.service'
export const signUp = async (req: Request, res: Response)=>{
    try {
        const
        const result = await authService.signUp()
    } catch (error) {
        res.status(400).json(error)
    }
}