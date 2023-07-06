import express, { NextFunction, Request, Response } from "express";
import { uploadConroller } from "./controllers/uploads.controller";
import { uploadConfig } from "./controllers/uploads.configs";

const routes = express.Router()
routes.post('/', uploadConfig, uploadConroller)

export {routes}