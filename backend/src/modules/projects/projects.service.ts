import prisma from '../../config/db'
import { slugify } from '../../utils/slugify'

export const getAllProjects = async () => {
  return prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    include: {
      tags: { select: { tag: { select: { name: true, slug: true, color: true } } } }
    }
  })
}

export const getProjectBySlug = async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      tags: { select: { tag: { select: { name: true, slug: true } } } }
    }
  })
  if (!project) throw new Error('Project nahi mila')
  return project
}

export const createProject = async (
  authorId: string,
  data: {
    title: string
    description: string
    content?: string
    coverImage?: string
    liveUrl?: string
    githubUrl?: string
    techStack?: string[]
    featured?: boolean
    order?: number
  }
) => {
  const slug = slugify(data.title)
  const existing = await prisma.project.findUnique({ where: { slug } })
  if (existing) throw new Error('Is title ka project already exist karta hai')

  return prisma.project.create({
    data: { ...data, slug, authorId }
  })
}

export const updateProject = async (id: string, data: any) => {
  if (data.title) data.slug = slugify(data.title)
  return prisma.project.update({ where: { id }, data })
}

export const deleteProject = async (id: string) => {
  await prisma.project.delete({ where: { id } })
}