import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Token was not provided.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    request.userId = decoded.id

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Token provided is invalid.' })
  }
}
