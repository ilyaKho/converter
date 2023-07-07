import express from "express";
import { setSession } from "./controllers/session.controllers";


const routes = express.Router()
routes.get('/', setSession)

export {routes}