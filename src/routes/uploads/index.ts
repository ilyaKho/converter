import express from "express";
import { uploadConroller } from "./controllers/uploads.controller";
import { uploadConfig } from "./controllers/uploads.configs";
import { uploadsValidation } from "./controllers/uploads.validation";
import {routes as statusRouter} from './status/index'
import { isJPGOnly } from "./guards/isJPGOnly";
const routes = express.Router()

// routes.use('/status', statusRouter)
routes.post('/', uploadConfig, uploadsValidation, uploadConroller)

export {routes}