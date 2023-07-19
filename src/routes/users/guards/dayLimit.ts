import { NextFunction, Request, Response } from "express";
import { authorizedRequest } from "../../../types";
import { UserT, unknownUserT } from "../users.schema";
import * as userService from '../users.service'
const checkLimits=(user:UserT | unknownUserT)=>{
    if(user){
        if(user.dayLimit === 0 || user.monthLimit === 0) return false
        else return true
    }
    else throw 'Пользователь не обнаружен'
}
export const dayLimit =(req: Request, res: Response, next: NextFunction)=>{
    try {
        let user = userService.getUserById((req as authorizedRequest).user.userId)
        let result: boolean
        if(user) result = checkLimits(user)
        else {
            let cookieUser = (req as authorizedRequest).user
            result = checkLimits(cookieUser)
        }
        if(!result) return res.status(402).json('Закончились лимиты.')
        return next()
    } catch (error) {
        throw error
    }
}