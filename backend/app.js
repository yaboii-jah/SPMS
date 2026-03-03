import session from 'express-session';
import passport from 'passport';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { routes as authRoutes }     from './routes/authRoute.js';

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth/api', authRoutes)

export function start() {
    app.listen(3000, () => {
        console.log(`Listening at http://localhost`)
    })
}