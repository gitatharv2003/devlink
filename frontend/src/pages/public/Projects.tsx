import { useEffect, useState } from 'react'
import { getProjectsApi } from '../../api/portfolio.api'
import SEO from '../../components/ui/SEO'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string | null
  liveUrl: string | null
  githubUrl: string | null
  techStack: string[]
  featured: boolean
  tags: { tag: { name: string; slug: string } }[]
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const data = await getProjectsApi()
      setProjects(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 min-h-screen">
      <SEO title="Projects | Atharv" description="Full stack projects built with React, Node.js, PostgreSQL." />

      <h1 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] tracking-tight mb-2">Projects</h1>
      <p className="text-[#8b949e] text-sm sm:text-base mb-8 sm:mb-10">Kuch cheezein jo maine banaye hain.</p>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-48 bg-[#161b22] rounded-lg animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-[#8b949e] text-sm">Abhi koi project nahi hai</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map(p => (
            <div key={p.id} className={"bg-[#161b22] border rounded-lg p-4 sm:p-5 transition-colors group " + (
              p.featured ? 'border-teal-600/50' : 'border-[#21262d] hover:border-teal-600'
            )}>
              {p.featured && (
                <span className="text-xs font-medium text-teal-400 bg-teal-900/30 border border-teal-600/30 px-2 py-0.5 rounded-full mb-3 inline-block">
                  Featured
                </span>
              )}
              <h3 className="font-semibold text-[#e6edf3] mb-2 text-sm sm:text-base group-hover:text-teal-400 transition-colors">{p.title}</h3>
              <p className="text-[#8b949e] text-xs sm:text-sm leading-relaxed mb-4">{p.description}</p>
              {p.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.techStack.map(tech => (
                    <span key={tech} className="px-2 py-0.5 bg-teal-900/20 text-teal-400 text-xs rounded border border-teal-600/20">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-4">
                {p.githubUrl && (
                  <a href={p.githubUrl as string} target="_blank" rel="noreferrer"
                    className="text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors">
                    GitHub
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl as string} target="_blank" rel="noreferrer"
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
