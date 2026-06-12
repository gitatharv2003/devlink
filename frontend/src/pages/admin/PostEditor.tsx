import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { createPostApi } from '../../api/posts.api'

export default function PostEditor() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('## Yahan likho...')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSave = async () => {
    if (!title.trim()) { setError('Title required hai'); return }
    if (!content.trim()) { setError('Content required hai'); return }
    setLoading(true)
    setError('')
    try {
      await createPostApi({ title, excerpt, content, status })
      setSuccess('Post save ho gaya!')
      setTimeout(() => navigate('/admin'), 1500)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Post save nahi hua')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#e6edf3]">New Post</h1>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={e => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
            className="bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-sm rounded-md px-3 py-2 focus:outline-none focus:border-teal-600"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-500 transition-colors disabled:opacity-50 font-medium"
          >
            {loading ? 'Save ho raha hai...' : 'Save Post'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 text-red-400 border border-red-600/30 text-sm px-4 py-2.5 rounded-md mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-teal-900/20 text-teal-400 border border-teal-600/30 text-sm px-4 py-2.5 rounded-md mb-4">{success}</div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-[#30363d] pb-3 text-2xl font-semibold text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600"
        />
        <input
          type="text"
          placeholder="Short excerpt (optional)..."
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600"
        />
        <div data-color-mode="dark">
          <MDEditor
            value={content}
            onChange={val => setContent(val || '')}
            height={450}
            preview="live"
          />
        </div>
      </div>
    </div>
  )
}
