import './env.setup';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { routes } from './routes'
import { hasSession } from './routes/auth/guards/hasSession';
const app = express()
const PORT = process.env.PORT!

app.use(cors({ credentials: true}))
app.use(morgan('dev'))
app.use(express.json());
app.use(hasSession)
app.use(routes)
app.listen(PORT, ()=> console.log('Сервер запушен на порту: ' + PORT))

