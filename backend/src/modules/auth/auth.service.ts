import bcrypt from 'bcryptjs'
import prisma from '../../config/db'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt'

export const registerUser = async (name: string, email: string, password: string) => {
  // Check karo email already exist karta hai ya nahi
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('Email already registered hai')

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { name, email, passwordHash }
  })

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  // Refresh token save karo DB mein
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken
  }
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Email ya password galat hai')

  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) throw new Error('Email ya password galat hai')

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken,
    refreshToken
  }
}

export const refreshAccessToken = async (refreshToken: string) => {
  // DB mein check karo token valid hai
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  })
  if (!stored) throw new Error('Refresh token invalid hai')
  if (stored.expiresAt < new Date()) throw new Error('Refresh token expire ho gaya')

  const decoded = verifyRefreshToken(refreshToken)
  const accessToken = generateAccessToken(decoded.userId)

  return { accessToken }
}

export const logoutUser = async (refreshToken: string) => {
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken }
  })
}