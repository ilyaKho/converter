import express from 'express';
import { getProfile, increaseLimit } from './controllers/users.controller';
const routes = express.Router()

routes.get('/', getProfile)
routes.get('/increase/pay', increaseLimit)
export {routes}
