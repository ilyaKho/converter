import { NextFunction, Request, Response } from "express";
import { AuthorizedRequestT } from "../../../types";
import { UserT, UnknownUserT } from "../controllers/users.schema";
import * as userService from '../controllers/users.service'
const checkLimits=(user:UserT | UnknownUserT)=>{
    if(user){
        if(user.dayLimit === 0 || user.monthLimit === 0) return false
        else return true
    }
    else throw 'Пользователь не обнаружен'
}
export const dayLimit =(req: Request, res: Response, next: NextFunction)=>{
    try {
        let user = userService.getUserById((req as AuthorizedRequestT).user.userId)
        let result: boolean
        if(user) result = checkLimits(user)
        else {
            let cookieUser = (req as AuthorizedRequestT).user
            result = checkLimits(cookieUser)
        }
        if(!result) return res.status(402).json('Закончились лимиты.')
        return next()
    } catch (error) {
        throw error
    }
}