import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export type status = 'Загружено' | 'Добавлено в очедерь' | 'В процессе обработки' | 'Готово'
export interface iUser {
    authorized: boolean
    user_id: string
    email?: string
    subscription?: boolean
    expires?: string
}
export interface authorizedRequest extends Request {
    user: iUser;
    token?: string
}