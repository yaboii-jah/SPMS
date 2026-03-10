import jwt from 'jsonwebtoken'
import 'dotenv/config';

export function generateAccessToken (user) {
    return jwt.sign(
        {user_id : user.user_id, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn : "1h"}
    )
}