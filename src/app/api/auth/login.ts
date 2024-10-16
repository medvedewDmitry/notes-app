import { NextApiHandlerWithCookie } from '@/types'
import cookies from '@/utils/cookies'
import prisma from '@/utils/prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const loginHandler: NextApiHandlerWithCookie = async (req, res) => {
  const data = JSON.parse(req.body)

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email
      },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        avatar_url: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const isPasswordCorrect = await argon2.verify(user.password, data.password)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Неправильный пользователь' })
    }

    const idToken = await jwt.sign(
      { user_id: user.id },
      process.env.ID_TOKEN_SECRET,
      {
        expiresIn: '7d'
      }
    )

    const accessToken = await jwt.sign(
      { user_id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.cookie({
      name: process.env.COOKIE_NAME,
      value: idToken,
      options: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
        sameSite: true,
        secure: true
      }
    })

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url
      },
      accessToken
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Ошибка авторизации пользователя' })
  }
}

export default cookies(loginHandler)
