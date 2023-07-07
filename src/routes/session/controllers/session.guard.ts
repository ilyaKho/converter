import { NextFunction, Request, Response } from 'express';

export const sessionGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(token) return res.status(201).json('Вы уже авторизованы')
        return next()
    } catch (error) {
        throw error
    }
}