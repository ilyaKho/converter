import express from "express";
import { routes as uploadRouts } from './uploads/index'
import { routes as authRouts } from './auth/index'
import { routes as profileRouts } from './users/index'
import { AuthorizedRequestT } from "../types";
import { dayLimit } from "./users/guards/dayLimit";
import { isLogin } from "./auth/guards/isLogin";
import { hasSession } from "./auth/guards/hasSession";
const routes = express.Router()


routes.use('/auth', authRouts)
routes.use(hasSession)
routes.use('/profile', isLogin, profileRouts)
routes.use('/upload', dayLimit, uploadRouts)
routes.use('/',
    (req, res) => {
        const request = req as AuthorizedRequestT
        res.json({user: request.user, token: request.token})
    }
)

export { routes }