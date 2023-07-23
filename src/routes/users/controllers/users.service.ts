import { nanoid } from "nanoid"
import { UserT } from "./users.schema"
import moment from "moment"

export const userDB: UserT[] = []

export const createUser = (email: string) => {
    try {
        let currentUser = getUserByEmail(email)
        if (currentUser) return currentUser
        let new_user: UserT = {
            authorized: true,
            userId: nanoid(),
            email,
            subscription: false,
            expires: 0,
            dayLimit: 20,
            monthLimit: 20,
            createdDate: Date.now()
        }
        userDB.push(new_user)
        return new_user
    } catch (error) {
        throw error
    }
}
export const getUserById = (userId: string) => {
    try {
        let user = userDB.find(el => el.userId === userId)
        return user
    } catch (error) {
        throw error
    }
}
export const getUserByEmail = (email: string) => {
    let user = userDB.find(el => el.userId === email)
    return user
}
export const setDayLimit = (userId: string, limit: number = 20) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    user.dayLimit = limit
    return user
}
export const decreaseLimit = (userId: string) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    user.dayLimit--
    user.monthLimit--
    return user
}
export const addDayLimit = (userId: string, limit: number = 20) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    user.dayLimit = user.dayLimit + limit
    return user

}
export const setMonthLimit = (userId: string, limit: number = 20) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    user.monthLimit = limit
    return user

}
export const addMonthLimit = (userId: string, limit: number = 20) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    user.monthLimit = user.monthLimit + limit
    return user
}
export const setLimit = (dto: { dayLimit?: number, monthLimit?: number, userId: string }) => {
    let user = {} as UserT
    if (dto.dayLimit) user = setDayLimit(dto.userId, dto.dayLimit)
    if (dto.monthLimit) user = setMonthLimit(dto.userId, dto.monthLimit)
    return user
}
export const addLimit = (dto: { dayLimit?: number, monthLimit?: number, userId: string }) => {
    let user = {} as UserT
    if (dto.dayLimit) user = addDayLimit(dto.userId, dto.dayLimit)
    if (dto.monthLimit) user = addMonthLimit(dto.userId, dto.monthLimit)
    return user
}
export const setSubscription = (userId: string) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    let dateOfNextMonth = moment().add(1, 'M').format()
    user.expires = new Date(dateOfNextMonth).getDate()
    user.subscription = true
    addLimit({ dayLimit: 200, userId, monthLimit: 200 * 30 })
    return {
        expires: user.expires,
        dayLimit: user.dayLimit,
        monthLimit: user.monthLimit
    }
}

export const getUserInfoById = (userId: string) => {
    let user = getUserById(userId)
    if (!user) throw 'Пользователь не найден'
    return {
        expires: user.expires,
        dayLimit: user.dayLimit,
        monthLimit: user.monthLimit
    }
}