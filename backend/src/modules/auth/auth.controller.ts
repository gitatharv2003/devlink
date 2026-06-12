import { Request, Response } from 'express'
import * as authService from './auth.service'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Sab fields required hain' })
    }
    const result = await authService.registerUser(name, email, password)
    res.status(201).json(result)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email aur password required hai' })
    }
    const result = await authService.loginUser(email, password)
    res.json(result)
  } catch (err: any) {
    res.status(401).json({ message: err.message })
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required hai' })
    }
    const result = await authService.refreshAccessToken(refreshToken)
    res.json(result)
  } catch (err: any) {
    res.status(401).json({ message: err.message })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body
    if (refreshToken) {
      await authService.logoutUser(refreshToken)
    }
    res.json({ message: 'Logout successful' })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const me = async (req: any, res: Response) => {
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, role: true }
    })
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}