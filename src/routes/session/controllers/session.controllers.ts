import { Request, Response } from "express"

export const getSession = (req: Request, res: Response)=>{
    try {
        
    } catch (error) {
       res.status(400).json(error)
    }
}