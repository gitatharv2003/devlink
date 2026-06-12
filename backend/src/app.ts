import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './modules/auth/auth.routes'
import postsRoutes from './modules/posts/posts.routes'
import projectsRoutes from './modules/projects/projects.routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/projects', projectsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevLink API chal raha hai!' })
})

app.use(errorHandler)

export default app