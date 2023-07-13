import express from "express";
import { signUp } from "./controllers/auth.controllers";
import { authValidation } from "./controllers/auth.validation";


const routes = express.Router()
routes.post('/signup',authValidation, signUp)

export {routes}