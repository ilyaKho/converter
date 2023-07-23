import { Request } from "express"
import { UserT, UnknownUserT } from '../routes/users/controllers/users.schema';

export type Status = 'Загружено' | 'Добавлено в очедерь' | 'В процессе обработки' | 'Готово'
export interface AuthorizedRequestT extends Request {
    user: UserT | UnknownUserT;
    token?: string
}