import express, { NextFunction, Request, Response } from "express";
import { uploadConroller } from "./controllers/uploads.controller";
import { uploadConfig } from "./controllers/uploads.configs";
import { uploadsValidation } from "./controllers/uploads.validation";
import {routes as statusRouter} from './status/index'
const routes = express.Router()
routes.get('/status', statusRouter)
routes.post('/', uploadConfig, uploadsValidation, uploadConroller)

export {routes}