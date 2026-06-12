import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPostBySlugApi } from '../../api/posts.api'
import MDEditor from '@uiw/react-md-editor'
import SEO from '../../components/ui/SEO'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  viewCount: number
  readingTime: number
  publishedAt: string
  author: { name: string; avatarUrl: string | null }
  tags: { tag: { name: string; slug: string } }[]
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { if (slug) fetchPost(slug) }, [slug])

  const fetchPost = async (slug: string) => {
    try {
      const data = await getPostBySlugApi(slug)
      setPost(data)
    } catch {
      setError('Post nahi mila')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <main className="max-w-2xl mx-auto px-6 py-16 min-h-screen bg-[#0d1117]">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-[#161b22] rounded w-3/4" />
        <div className="h-4 bg-[#161b22] rounded w-1/2" />
        <div className="h-64 bg-[#161b22] rounded mt-8" />
      </div>
    </main>
  )

  if (error || !post) return (
    <main className="max-w-2xl mx-auto px-6 py-16 text-center min-h-screen bg-[#0d1117]">
      <p className="text-[#8b949e] mb-4">{error}</p>
      <Link to="/blog" className="text-teal-400 text-sm hover:underline">Blog pe wapas jao</Link>
    </main>
  )

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 min-h-screen bg-[#0d1117]">
      <SEO
        title={post.title + " | Atharv"}
        description={post.excerpt || post.title}
        type="article"
      />

      <Link to="/blog" className="text-sm text-[#8b949e] hover:text-teal-400 transition-colors mb-8 inline-flex items-center gap-1">
        Blog
      </Link>

      <h1 className="text-3xl font-bold text-[#e6edf3] mb-4 leading-tight mt-4">{post.title}</h1>

      <div className="flex items-center gap-3 text-sm text-[#8b949e] mb-6">
        <span className="font-medium text-[#e6edf3]">{post.author.name}</span>
        <span>·</span>
        <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span>·</span>
        <span>{post.readingTime} min read</span>
        <span>·</span>
        <span>{post.viewCount} views</span>
      </div>

      {post.tags.length > 0 && (
        <div className="flex gap-2 mb-8">
          {post.tags.map(({ tag }) => (
            <span key={tag.slug} className="text-xs px-2 py-1 bg-teal-900/30 text-teal-400 border border-teal-600/30 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-[#21262d] pt-8" data-color-mode="dark">
        <MDEditor.Markdown
          source={post.content}
          style={{ background: 'transparent', color: '#e6edf3' }}
        />
      </div>
    </main>
  )
}
