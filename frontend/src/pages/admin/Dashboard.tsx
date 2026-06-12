import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPostsApi, deletePostApi } from '../../api/posts.api'
import { useAuthStore } from '../../store/authStore'

interface Post {
  id: string
  title: string
  status: string
  publishedAt: string | null
  createdAt: string
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const data = await getPostsApi(1, 10)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(title + ' delete karna chahte ho?')) return
    try {
      await deletePostApi(id)
      setPosts(prev => prev.filter(p => p.id !== id))
      setTotal(prev => prev - 1)
    } catch {
      alert('Delete nahi hua, dobara try karo')
    }
  }

  const published = posts.filter(p => p.status === 'PUBLISHED').length
  const drafts = posts.filter(p => p.status === 'DRAFT').length

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-[#e6edf3] mb-1">Dashboard</h1>
      <p className="text-[#8b949e] text-sm mb-8">
        Welcome back, <span className="text-teal-400 font-medium">{user?.name}</span>!
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: total, color: 'text-teal-400' },
          { label: 'Published', value: published, color: 'text-green-400' },
          { label: 'Drafts', value: drafts, color: 'text-amber-400' },
        ].map((s, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 text-center">
            <div className={"text-2xl font-bold " + s.color}>{s.value}</div>
            <div className="text-[#8b949e] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#e6edf3]">Posts</h2>
          <Link to="/admin/posts/new"
            className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-500 transition-colors font-medium">
            + New Post
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-10 bg-[#21262d] rounded animate-pulse" />)}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-[#8b949e] text-sm text-center py-6">
            Koi post nahi —{' '}
            <Link to="/admin/posts/new" className="text-teal-400 hover:underline">pehla post likho!</Link>
          </p>
        ) : (
          <div className="divide-y divide-[#21262d]">
            {posts.map(post => (
              <div key={post.id} className="py-3 flex items-center justify-between gap-4">
                <span className="text-sm text-[#e6edf3] flex-1 truncate">{post.title}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={"text-xs px-2 py-0.5 rounded-full font-medium border " + (
                    post.status === 'PUBLISHED'
                      ? 'bg-teal-900/30 text-teal-400 border-teal-600/30'
                      : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                  )}>
                    {post.status}
                  </span>
                  <Link to={"/admin/posts/edit/" + post.id}
                    className="text-xs text-teal-400 hover:underline px-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-xs text-red-400 hover:text-red-300 px-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/posts/new"
          className="bg-teal-900/30 border border-teal-600/30 text-teal-400 rounded-xl p-5 hover:bg-teal-900/50 transition-colors">
          <div className="text-lg mb-1">??</div>
          <div className="font-medium text-sm">New Post likhna</div>
        </Link>
        <Link to="/" target="_blank"
          className="bg-[#161b22] border border-[#21262d] text-[#8b949e] rounded-xl p-5 hover:border-[#30363d] hover:text-[#e6edf3] transition-colors">
          <div className="text-lg mb-1">??</div>
          <div className="font-medium text-sm">Portfolio dekhna</div>
        </Link>
      </div>
    </div>
  )
}
