import { Router } from 'express'
import { authenticate } from '../../middleware/auth'
import prisma from '../../config/db'
import { slugify } from '../../utils/slugify'
import * as projectsService from './projects.service'
import { AuthRequest } from '../../middleware/auth'
import { Request, Response } from 'express'

const router = Router()

// Public — sab projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await projectsService.getAllProjects()
    res.json(projects)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
})

// Public — single project
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const project = await projectsService.getProjectBySlug(req.params.slug as string)
    res.json(project)
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
})

// Admin — create
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, content, coverImage, liveUrl, githubUrl, techStack, featured, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ message: 'Title aur description required hai' })
    }
    const project = await projectsService.createProject(req.userId!, {
      title, description, content, coverImage, liveUrl, githubUrl, techStack, featured, order
    })
    res.status(201).json(project)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Admin — update
router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const project = await projectsService.updateProject(req.params.id as string, req.body)
    res.json(project)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

// Admin — delete
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await projectsService.deleteProject(req.params.id as string)
    res.json({ message: 'Project delete ho gaya' })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
})

export default router