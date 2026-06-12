import { useState } from 'react'
import SEO from '../../components/ui/SEO'

const skills = [
  { name: 'React.js', hot: true },
  { name: 'JavaScript', hot: true },
  { name: 'HTML5', hot: true },
  { name: 'CSS3', hot: true },
  { name: 'Tailwind CSS', hot: true },
  { name: 'Git', hot: false },
  { name: 'REST APIs', hot: false },
  { name: 'Python', hot: false },
  { name: 'Bootstrap', hot: false },
  { name: 'Vercel', hot: false },
  { name: 'Linux', hot: false },
  { name: 'Postman', hot: false },
]

const experience = [
  {
    company: 'Internselite',
    role: 'Cyber Security Intern',
    duration: 'Sep 2024 - Nov 2024',
    desc: 'Developed strong problem-solving and analytical thinking skills. Worked on real-world scenarios requiring attention to detail and debugging.'
  },
  {
    company: 'Deloitte Australia',
    role: 'Cyber Job Simulation Participant',
    duration: 'Sep 2024 - Nov 2024',
    desc: 'Completed tasks focused on analysis and structured problem-solving. Improved understanding of system workflows and technical documentation.'
  }
]

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 min-h-screen">
      <SEO
        title="Atharv Kumar Verma | Frontend Developer"
        description="Entry-level Frontend Developer skilled in React, JavaScript, HTML, CSS. Available for placement. Based in Varanasi, India."
      />

      <section className="mb-12 sm:mb-16 animate-slide-up">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-4 sm:mb-5">
          AV
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] tracking-tight mb-2">Atharv Kumar Verma</h1>
        <p className="text-teal-400 text-sm font-medium mb-3 sm:mb-4">Frontend Developer · B.Tech CSE · Varanasi, India</p>
        <p className="text-[#8b949e] text-sm sm:text-base leading-relaxed max-w-xl mb-5 sm:mb-6">
          Entry-level Frontend Developer with a strong foundation in building responsive and user-friendly web interfaces.
          Skilled in HTML, CSS, JavaScript, and React.js with a focus on creating clean UI and smooth user experience.
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <a href="#contact" className="px-4 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-500 transition-colors font-medium">
            Contact me
          </a>
          <a href="https://github.com/Atharv182" target="_blank" rel="noreferrer"
            className="px-4 py-2 bg-[#161b22] text-[#e6edf3] text-sm rounded-md border border-[#30363d] hover:border-[#8b949e] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/atharv-kumar-verma" target="_blank" rel="noreferrer"
            className="px-4 py-2 bg-[#161b22] text-[#e6edf3] text-sm rounded-md border border-[#30363d] hover:border-[#8b949e] transition-colors">
            LinkedIn
          </a>
          <a href="/resume.pdf" download
            className="px-4 py-2 bg-transparent text-teal-400 text-sm rounded-md border border-teal-600 hover:bg-teal-900/20 transition-colors">
            Resume
          </a>
        </div>
        <div className="flex flex-wrap gap-4 mt-5 text-xs text-[#8b949e]">
          <span>atharvkumar182@gmail.com</span>
          <span>+91 7310483130</span>
          <span>Varanasi, India</span>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
        {[
          { num: '3+', label: 'Projects' },
          { num: '2', label: 'Internships' },
          { num: 'AKTU', label: 'University' },
        ].map((s, i) => (
          <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-lg p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-teal-400">{s.num}</div>
            <div className="text-[#8b949e] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-3">
          Skills <span className="flex-1 h-px bg-[#21262d]"></span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.name} className={"px-3 py-1.5 text-xs sm:text-sm rounded-full border font-medium " + (
              skill.hot ? 'bg-teal-900/30 text-teal-400 border-teal-600' : 'bg-[#161b22] text-[#8b949e] border-[#30363d]'
            )}>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-3">
          Education <span className="flex-1 h-px bg-[#21262d]"></span>
        </h2>
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <div>
              <h3 className="font-medium text-[#e6edf3] text-sm sm:text-base">B.Tech in Computer Science Engineering</h3>
              <p className="text-teal-400 text-xs sm:text-sm">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</p>
              <p className="text-[#8b949e] text-xs mt-1">Data Structures, OOPs, DBMS, Computer Networks, Operating Systems</p>
            </div>
            <span className="text-xs text-[#8b949e] shrink-0">2022 - 2026</span>
          </div>
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-3">
          Experience <span className="flex-1 h-px bg-[#21262d]"></span>
        </h2>
        <div className="space-y-5 sm:space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-teal-600 pl-4 sm:pl-5">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <h3 className="font-medium text-[#e6edf3] text-sm sm:text-base">{exp.role}</h3>
                  <p className="text-teal-400 text-xs sm:text-sm">{exp.company}</p>
                </div>
                <span className="text-xs text-[#8b949e] shrink-0">{exp.duration}</span>
              </div>
              <p className="text-[#8b949e] text-xs sm:text-sm mt-2 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 sm:mb-16">
        <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-3">
          Languages <span className="flex-1 h-px bg-[#21262d]"></span>
        </h2>
        <div className="flex gap-3">
          {[
            { lang: 'English', level: 'Professional' },
            { lang: 'Hindi', level: 'Native' },
          ].map((l, i) => (
            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-lg px-4 py-3 text-center">
              <div className="text-[#e6edf3] text-sm font-medium">{l.lang}</div>
              <div className="text-[#8b949e] text-xs mt-0.5">{l.level}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2 className="text-base sm:text-lg font-semibold text-[#e6edf3] mb-4 flex items-center gap-3">
          Contact <span className="flex-1 h-px bg-[#21262d]"></span>
        </h2>
        <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 sm:p-6">
          {sent ? (
            <div className="text-center py-8 text-teal-400 text-sm">Message send ho gaya! Jald reply karunga.</div>
          ) : (
            <form onSubmit={handleContact} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Aapka naam" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600" />
                <input type="email" placeholder="Email" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} required
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600" />
              </div>
              <textarea placeholder="Message..." value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2.5 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-teal-600 resize-none" />
              <button type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-500 transition-colors font-medium">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
