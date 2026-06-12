import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPostsApi } from '../../api/posts.api'
import SEO from '../../components/ui/SEO'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  viewCount: number
  readingTime: number
  publishedAt: string
  author: { name: string }
  tags: { tag: { name: string; slug: string; color: string } }[]
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    try {
      const data = await getPostsApi()
      setPosts(data.posts)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 min-h-screen">
      <SEO title="Blog | Atharv" description="Thoughts and tutorials on web development." />

      <h1 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] tracking-tight mb-2">Blog</h1>
      <p className="text-[#8b949e] text-sm sm:text-base mb-6 sm:mb-8">Thoughts on web development.</p>

      <input
        type="text"
        placeholder="Posts search karo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-[#161b22] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600 mb-8 sm:mb-10"
      />

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-24 bg-[#161b22] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#8b949e] text-sm">
          {search ? 'Koi post nahi mila' : 'Abhi koi post nahi hai'}
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {filtered.map(post => (
            <Link key={post.id} to={"/blog/" + post.slug} className="block group">
              <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 sm:p-5 hover:border-teal-600 transition-colors">
                <h2 className="text-sm sm:text-base font-semibold text-[#e6edf3] group-hover:text-teal-400 transition-colors mb-2">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[#8b949e] text-xs sm:text-sm leading-relaxed mb-3">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
                  <span>{post.author.name}</span>
                  <span>·</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                  <span>·</span>
                  <span>{post.viewCount} views</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(({ tag }) => (
                      <span key={tag.slug} className="text-xs px-2 py-0.5 bg-teal-900/30 text-teal-400 border border-teal-600/30 rounded-full">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
