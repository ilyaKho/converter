import { NextFunction, Request, Response } from 'express';
import * as userService from './users.service';
import { AuthorizedRequestT } from '../../../types';

export const getProfile = (req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = userService.getUserInfoById((req as AuthorizedRequestT).user.userId)
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
}

export const increaseLimit = (req: Request, res: Response, next: NextFunction) => {
    try {        
        const profile = userService.setSubscription((req as AuthorizedRequestT).user.userId)
        res.status(200).json(profile)
    } catch (error) {
        next(error)
    }
}