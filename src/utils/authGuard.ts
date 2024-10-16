import jwt from 'jsonwebtoken'
import { AuthGuardMiddleware } from '../types'

const authGuard: AuthGuardMiddleware =
    (handler) => async (req, res) => {
        const accessToken = req.headers.authorization?.split(' ')[1]

        if (!accessToken) {
            return res.status(403).json({ message: 'Access token должен быть' })
        }

        const decodedToken = (await jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        )) as unknown as {
            user_id: string
        }

        if (
            !decodedToken || !decodedToken.user_id
        ) {
            return res.status(403).json({ message: 'Некоректный токен' })
        }

        req.user_id = decodedToken.user_id

        return handler(req, res)
    }

export default authGuard