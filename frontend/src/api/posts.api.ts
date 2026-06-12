import api from './axios'

export const getPostsApi = async (page = 1, limit = 10, tag?: string) => {
  const params: any = { page, limit }
  if (tag) params.tag = tag
  const res = await api.get('/posts', { params })
  return res.data
}

export const getPostBySlugApi = async (slug: string) => {
  const res = await api.get(`/posts/${slug}`)
  return res.data
}

export const searchPostsApi = async (query: string) => {
  const res = await api.get('/posts/search', { params: { q: query } })
  return res.data
}

export const createPostApi = async (data: {
  title: string
  content: string
  excerpt?: string
  status?: string
}) => {
  const res = await api.post('/posts', data)
  return res.data
}

export const updatePostApi = async (id: string, data: any) => {
  const res = await api.put(`/posts/${id}`, data)
  return res.data
}

export const deletePostApi = async (id: string) => {
  const res = await api.delete(`/posts/${id}`)
  return res.data
}