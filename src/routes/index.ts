import express from "express";
import { routes as uploadRouts } from './uploads/index'
const routes = express.Router()

routes.use('/upload', uploadRouts )

export {routes}