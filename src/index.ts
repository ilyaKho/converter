import express from 'express'
import morgan from 'morgan'
import { routes } from './routes'
import { connectionLimiter } from './limiter'
import { auth } from './auth'
const app = express()
const PORT = 5000
let connections = 0

app.use(morgan('dev'))
app.use(express.json());
app.use((req, res, next) => connectionLimiter(req, res, next, connections))
app.use(auth)
app.use(routes)
app.listen(PORT, ()=> console.log('Сервер запушен на порту: ' + PORT))

