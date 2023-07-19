import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
import { UserT, unknownUserT } from '../routes/users/controllers/users.schema';

export type status = 'Загружено' | 'Добавлено в очедерь' | 'В процессе обработки' | 'Готово'
export interface iUser {
    authorized: boolean
    userId: string
    email?: string
    subscription?: boolean
    expires?: string
    dayLimit?: number
    monthLimit?: number,
}
export interface authorizedRequest extends Request {
    user: UserT | unknownUserT;
    token?: string
}