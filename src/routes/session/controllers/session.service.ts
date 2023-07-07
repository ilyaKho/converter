import jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";

export const setSession = () => {
    try {
        const SECRET_KEY = 'ddfsfddfsd'
        const id = nanoid()
        const token = jwt.sign({ user_id: id }, SECRET_KEY, {
            expiresIn: '2 days',
        });
        return token
    } catch (error) {
        throw error
    }
}