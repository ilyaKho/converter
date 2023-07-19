import { NextFunction, Request, Response } from "express";
import { generateToken, ucodeToken } from '../utils/jwt';
import { authorizedRequest, iUser } from '../../../types';
import { nanoid } from 'nanoid';
import { UserT, unknownUserT } from "../../users/users.schema";


export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let request =  req as authorizedRequest
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decoded = ucodeToken(token);
            request.user = decoded; 
            request.token = ''
        }
        else{
            let newUser: unknownUserT = {
               authorized: false,
               userId: nanoid(),
               monthLimit: 20,
               dayLimit: 20
            }
            const newToken = await generateToken(newUser)
            request.user = newUser
            request.token = newToken
        }
        return next()
    } catch (error) {
        next(error)
    }
}