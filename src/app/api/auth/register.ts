import { NextApiHandlerWithCookie } from '@/types'
import cookies from '@/utils/cookies'
import prisma from '@/utils/prisma'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const registerHandler: NextApiHandlerWithCookie = async (req, res) => {
  const data = JSON.parse(req.body)

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return res.status(409).json({ message: 'Такой email уже используется' })
    }

    const passwordHash = await argon2.hash(data.password)
    data.password = passwordHash

    const newUser = await prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true
      }
    })

    const idToken = await jwt.sign(
      { user_id: newUser.id },
      process.env.ID_TOKEN_SECRET,
      {
        expiresIn: '7d'
      }
    )

    const accessToken = await jwt.sign(
      { user_id: newUser.id },
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
      user: newUser,
      accessToken
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Ошибка регистрации нового пользователя' })
  }
}

export default cookies(registerHandler)
