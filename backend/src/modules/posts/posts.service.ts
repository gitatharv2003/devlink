import prisma from '../../config/db'
import { slugify } from '../../utils/slugify'
import { paginate } from '../../utils/paginate'

// Sab published posts lao (public ke liye)
export const getPublishedPosts = async (page: number, limit: number, tag?: string) => {
  const { skip, take } = paginate(page, limit)

  const where: any = { status: 'PUBLISHED' }
  if (tag) {
    where.tags = { some: { tag: { slug: tag } } }
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      skip,
      take,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        viewCount: true,
        readingTime: true,
        publishedAt: true,
        author: { select: { name: true, avatarUrl: true } },
        tags: { select: { tag: { select: { name: true, slug: true, color: true } } } }
      }
    }),
    prisma.post.count({ where })
  ])

  return { posts, total, page, limit, totalPages: Math.ceil(total / limit) }
}

// Single post by slug
export const getPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, avatarUrl: true } },
      tags: { select: { tag: { select: { name: true, slug: true, color: true } } } }
    }
  })

  if (!post) throw new Error('Post nahi mila')

  // View count badhaao
  await prisma.post.update({
    where: { slug },
    data: { viewCount: { increment: 1 } }
  })

  return post
}

// Admin — sab posts (draft bhi)
export const getAllPosts = async (page: number, limit: number) => {
  const { skip, take } = paginate(page, limit)

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        viewCount: true,
        publishedAt: true,
        createdAt: true,
        tags: { select: { tag: { select: { name: true, slug: true } } } }
      }
    }),
    prisma.post.count()
  ])

  return { posts, total, page, limit, totalPages: Math.ceil(total / limit) }
}

// Post create karo
export const createPost = async (
  authorId: string,
  data: {
    title: string
    content: string
    excerpt?: string
    coverImage?: string
    status?: 'DRAFT' | 'PUBLISHED'
    tags?: string[]
  }
) => {
  const slug = slugify(data.title)

  // Slug unique check
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) throw new Error('Is title ka post already exist karta hai')

  // Reading time calculate karo
  const wordsPerMinute = 200
  const wordCount = data.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      status: data.status || 'DRAFT',
      readingTime,
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      authorId,
      tags: data.tags ? {
        create: data.tags.map(tagId => ({ tag: { connect: { id: tagId } } }))
      } : undefined
    },
    include: {
      tags: { select: { tag: true } }
    }
  })

  return post
}

// Post update karo
export const updatePost = async (
  id: string,
  data: {
    title?: string
    content?: string
    excerpt?: string
    coverImage?: string
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  }
) => {
  const updateData: any = { ...data }

  if (data.title) {
    updateData.slug = slugify(data.title)
  }

  if (data.content) {
    const wordsPerMinute = 200
    const wordCount = data.content.split(/\s+/).length
    updateData.readingTime = Math.ceil(wordCount / wordsPerMinute)
  }

  if (data.status === 'PUBLISHED') {
    updateData.publishedAt = new Date()
  }

  const post = await prisma.post.update({
    where: { id },
    data: updateData
  })

  return post
}

// Post delete karo
export const deletePost = async (id: string) => {
  await prisma.post.delete({ where: { id } })
}

// Search posts
export const searchPosts = async (query: string) => {
  const posts = await prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
    take: 10
  })
  return posts
}