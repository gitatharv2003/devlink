import api from './axios'

export const getProjectsApi = async () => {
  const res = await api.get('/projects')
  return res.data
}

export const getProjectBySlugApi = async (slug: string) => {
  const res = await api.get('/projects/' + slug)
  return res.data
}
