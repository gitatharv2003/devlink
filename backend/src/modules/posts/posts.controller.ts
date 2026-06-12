import { Request, Response } from 'express'
import * as postsService from './posts.service'
import { AuthRequest } from '../../middleware/auth'

export const getPublishedPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const tag = req.query.tag as string
    const result = await postsService.getPublishedPosts(page, limit, tag)
    res.json(result)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string
    const post = await postsService.getPostBySlug(slug)
    res.json(post)
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await postsService.getAllPosts(page, limit)
    res.json(result)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, excerpt, coverImage, status, tags } = req.body
    if (!title || !content) {
      return res.status(400).json({ message: 'Title aur content required hai' })
    }
    const post = await postsService.createPost(req.userId!, {
      title, content, excerpt, coverImage, status, tags
    })
    res.status(201).json(post)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string
    const post = await postsService.updatePost(id, req.body)
    res.json(post)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string
    await postsService.deletePost(id)
    res.json({ message: 'Post delete ho gaya' })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const searchPosts = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string
    if (!query) return res.status(400).json({ message: 'Search query required hai' })
    const posts = await postsService.searchPosts(query)
    res.json(posts)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}