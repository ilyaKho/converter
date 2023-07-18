import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { iUser } from '../../../types';

const SECRET_KEY = process.env.SECRET_KEY! 
export const generateToken =async (user: iUser) => {
    try {
        const token = jwt.sign({ user }, SECRET_KEY, {
            expiresIn: 15 * 60,
        });
        return token
    } catch (error) {
        throw error
    }
}
export const ucodeToken = (token: string) => {
    try {
        let user = jwt.verify(token, SECRET_KEY) as iUser
        return user
    } catch (error) {
        if(error instanceof TokenExpiredError) throw 'Время сессии истекло. Необходимо авторизоваться.'
        throw error
    }
}