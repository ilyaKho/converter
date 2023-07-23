import { NextFunction, Request, Response } from "express";
import { ucodeToken } from '../utils/jwt';

export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json('Необходимо авторизоваться')
        const decoded = ucodeToken(token);
        if (!decoded.authorized) return res.status(401).json('Необходимо авторизоваться')
        return next()
    } catch (error) {
        next(error)
    }
}