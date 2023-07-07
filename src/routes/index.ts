import express from "express";
import { routes as uploadRouts } from './uploads/index'
import { routes as sessionRouts } from './session/index'
const routes = express.Router()

routes.use('/session', sessionRouts )
routes.use('/upload', uploadRouts )

export {routes}