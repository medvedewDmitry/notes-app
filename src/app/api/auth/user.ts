import prisma from '@/utils/prisma'
import jwt from 'jsonwebtoken'
import { NextApiHandler } from 'next'

const userHandler: NextApiHandler = async (req, res) => {
  const idToken = req.cookies[process.env.COOKIE_NAME]

  if (!idToken) {
    return res.status(401).json({ message: 'Необходимо предоставить идентификационный токен' })
  }

  try {
    const decodedToken = (await jwt.verify(
      idToken,
      process.env.ID_TOKEN_SECRET
    )) as unknown as { user_id: number }

    if (!decodedToken || !decodedToken.user_id) {
      return res.status(403).json({ message: 'Недопустимый токен' })
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.user_id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar_url: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const accessToken = await jwt.sign(
      { user_id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.status(200).json({ user, accessToken })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Пользователь вызывает ошибку' })
  }
}

export default userHandler
