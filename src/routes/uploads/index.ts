import express, { NextFunction, Request, Response } from "express";
import { uploadConroller } from "./controllers/uploads.controller";
import { uploadConfig } from "./controllers/uploads.configs";
import { uploadsValidation } from "./controllers/uploads.validation";

const routes = express.Router()
routes.post('/', uploadConfig, uploadsValidation, uploadConroller)

export {routes}