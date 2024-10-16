import { NextApiHandlerWithCookie } from '@/types'
import authGuard from '@/utils/authGuard'
import cookies from '@/utils/cookies'

const logoutHandler: NextApiHandlerWithCookie = async (req, res) => {
  res.cookie({
    name: process.env.COOKIE_NAME,
    value: '',
    options: {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: true,
      secure: true
    }
  })

  res.status(200).json({ message: 'Выход выполнен успешно' })
}

export default authGuard(cookies(logoutHandler) as any)
