import { NextFunction, Request, Response } from "express"
const maxConnection = 3
let connections = 0
export const connectionLimiter = (req: Request, res: Response, next: NextFunction, connection: number) => {
    try {
        if (connection > maxConnection) res.status(503).json('Сервер перегружен. Ожидайте, пожалуйста')
        else {
            console.log(connection)
            return next()
        }
    } catch (error) {
        throw error
    }
}