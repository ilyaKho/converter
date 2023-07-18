import express from "express";
import { requestGoogleAccess } from "./controllers/auth.controllers";
import { authValidation } from "./controllers/auth.validation";
import { verifyGoogleAccess } from "./guards/verifyGoogleAccess";
import { signIn } from "./controllers/auth.controllers";


const routes = express.Router()
routes.get('/access/google/verify', verifyGoogleAccess, signIn)
routes.get('/access/google', requestGoogleAccess)
// routes.get('/signup', signUp)
// routes.get('/signin', signIn)

export {routes}