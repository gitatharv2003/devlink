export interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string | null
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  coverImage?: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  viewCount: number
  readingTime?: number | null
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
  author: { name: string; avatarUrl?: string | null }
  tags: { tag: { name: string; slug: string; color?: string | null } }[]
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content?: string | null
  coverImage?: string | null
  liveUrl?: string | null
  githubUrl?: string | null
  techStack: string[]
  featured: boolean
  order: number
  createdAt: string
  tags: { tag: { name: string; slug: string } }[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}