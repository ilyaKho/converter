import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { nanoid } from 'nanoid'
import * as admin from 'firebase-admin'

const SECRET_KEY = 'jsdfsdf999ds'

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            const id = nanoid()
            const token = jwt.sign({ user_id: id }, SECRET_KEY, {
                expiresIn: '2 days',
            });
            return next()
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        return next();
    } catch (err) {
        throw err
    }
};
 interface IWithUser extends Request{
    user: any
 }
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }


    let decodedToken = await admin.auth().verifyIdToken(token);
    (req as IWithUser).user = decodedToken
    return next();

};