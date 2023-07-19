import { NextFunction, Request, Response } from "express";
import { generateToken, ucodeToken } from '../utils/jwt';
import { authorizedRequest, iUser } from '../../../types';
import { nanoid } from 'nanoid';
import { UserT, unknownUserT } from "../../users/controllers/users.schema";


export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let request = req as authorizedRequest
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json('Необходимо авторизоваться')
        const decoded = ucodeToken(token);
        if(!decoded.authorized) return res.status(401).json('Необходимо авторизоваться')
        return next()
    } catch (error) {
        next(error)
    }
}