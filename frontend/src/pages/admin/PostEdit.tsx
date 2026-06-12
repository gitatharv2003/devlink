import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { updatePostApi } from '../../api/posts.api'
import api from '../../api/axios'

export default function PostEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) fetchPost(id)
  }, [id])

  const fetchPost = async (postId: string) => {
    try {
      const res = await api.get('/posts/admin/all')
      const allPosts = res.data.posts
      const post = allPosts.find((p: any) => p.id === postId)
      if (post) {
        const fullRes = await api.get('/posts/' + post.slug)
        const full = fullRes.data
        setTitle(full.title)
        setExcerpt(full.excerpt || '')
        setContent(full.content)
        setStatus(full.status)
      }
    } catch (err) {
      setError('Post load nahi hua')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title aur content required hai')
      return
    }
    setSaving(true)
    setError('')
    try {
      await updatePostApi(id!, { title, excerpt, content, status })
      navigate('/admin')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Save nahi hua')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={e => setStatus(e.target.value as any)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? 'Save ho raha hai...' : 'Save'}
          </button>
        </div>
      </div>
      {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>}
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Post title..."
          className="w-full text-2xl font-semibold border-0 border-b border-gray-200 pb-3 focus:outline-none focus:border-indigo-400 bg-transparent"
        />
        <input
          type="text"
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          placeholder="Short excerpt..."
          className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-400"
        />
        <div data-color-mode="light">
          <MDEditor value={content} onChange={val => setContent(val || '')} height={450} preview="live" />
        </div>
      </div>
    </div>
  )
}
