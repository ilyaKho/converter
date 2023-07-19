import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { UserT, unknownUserT } from '../../users/users.schema';

const SECRET_KEY = process.env.SECRET_KEY! 
export const generateToken =async (user: UserT| unknownUserT) => {
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
        let user = jwt.verify(token, SECRET_KEY) as UserT
        return user
    } catch (error) {
        if(error instanceof TokenExpiredError) throw 'Время сессии истекло. Необходимо авторизоваться.'
        throw error
    }
}