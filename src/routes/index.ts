import express from "express";
import { routes as uploadRouts } from './uploads/index'
import { routes as authRouts } from './auth/index'
import { routes as profileRouts } from './users/index'
import { authorizedRequest } from "../types";
import { dayLimit } from "./users/guards/dayLimit";
import { isLogin } from "./auth/guards/isLogin";
const routes = express.Router()

routes.use('/',
    (req, res) => {
        const request = req as authorizedRequest
        res.json({user: request.user, token: request.token})
    }
)
routes.use('/auth', authRouts)
routes.use('/profile', isLogin, profileRouts)
routes.use('/upload', dayLimit, uploadRouts)


export { routes }