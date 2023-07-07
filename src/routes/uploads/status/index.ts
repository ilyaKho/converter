import express, { NextFunction, Request, Response } from "express";
import { getStatus } from "./controllers/status.controller";
const routes = express.Router()
routes.get('/', getStatus)

export {routes}