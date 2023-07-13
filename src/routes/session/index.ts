import express from "express";
import { setSession } from "./controllers/session.controllers";
import { sessionGuard } from "./controllers/session.guard";


const routes = express.Router()
routes.post('/signup',)
routes.get('/',sessionGuard, setSession)

export {routes}