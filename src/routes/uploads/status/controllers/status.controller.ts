import * as statusService from './status.service';
import { Request, Response } from "express"

export const getStatus = (req: Request, res: Response)=>{
    try {        
        const status = statusService.getStatus(req.query.token as string,9)
        res.status(200).json(...status)
    } catch (error) {
        throw error
    }
}