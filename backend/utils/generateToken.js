import jwt from 'jsonwebtoken'
import 'dotenv/config';

export function generateAccessToken (user) {
    const accessToken = jwt.sign(
        {user_id : user.user_id, role: user.role},
        process.env.ACCESS_SECRET,
        { expiresIn : "15m"}
    )

    const refreshToken = jwt.sign(
        {user_id : user.user_id, role: user.role},
        process.env.REFRESH_SECRET,
        { expiresIn : "7d"}
    )
    
    return { accessToken, refreshToken}

}