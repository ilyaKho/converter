import express from 'express'
import morgan from 'morgan'
import { routes } from './routes'
import { auth } from './auth'
const app = express()
const PORT = 5000

app.use(morgan('dev'))
app.use(express.json());
// app.use(auth)
app.use(routes)
app.listen(PORT, ()=> console.log('Сервер запушен на порту: ' + PORT))

