import express from "express";
import { requestGoogleAccess, verifyGoogleAccess, } from "./controllers/auth.controllers";
import { authValidation } from "./controllers/auth.validation";


const routes = express.Router()
routes.get('/access/google', requestGoogleAccess)
routes.get('/access/google/verify', verifyGoogleAccess)
// routes.get('/signup', signUp)
// routes.get('/signin', signIn)

export {routes}