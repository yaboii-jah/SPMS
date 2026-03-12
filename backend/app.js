import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes as authRoutes } from './routes/authRoute.js';
import { routes as performanceRoutes } from './routes/performanceRoute.js';

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth/api', authRoutes)
app.use('/performance/api', performanceRoutes)

export function start() {
    app.listen(3005, () => {
        console.log(`Listening at http://localhost`)
    })
}