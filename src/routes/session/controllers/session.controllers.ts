import * as sessionService from './session.service';
import { Request, Response } from "express"
import { nanoid } from "nanoid"

export const setSession = (req: Request, res: Response) => {
    try {
        const token = sessionService.setSession()
        res.status(200).json(token)
    } catch (error) {
        res.status(400).json(error)
    }
}