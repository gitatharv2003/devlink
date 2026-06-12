import { Router } from 'express'
import {
  getPublishedPosts,
  getPostBySlug,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  searchPosts
} from './posts.controller'
import { authenticate } from '../../middleware/auth'

const router = Router()

// Public routes
router.get('/', getPublishedPosts)
router.get('/search', searchPosts)
router.get('/:slug', getPostBySlug)

// Admin routes — protected
router.get('/admin/all', authenticate, getAllPosts)
router.post('/', authenticate, createPost)
router.put('/:id', authenticate, updatePost)
router.delete('/:id', authenticate, deletePost)

export default router