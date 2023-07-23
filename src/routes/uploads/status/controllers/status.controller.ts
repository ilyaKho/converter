import * as statusService from './status.service';
import { Request, Response } from "express"

export const getStatus = async (req: Request, res: Response)=>{
    try {        
        const status = await statusService.getStatus(req.params.fileId ,9)
        res.status(200).json(status)
    } catch (error) {
        throw error
    }
}