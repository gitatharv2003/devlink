import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import AdminLayout from './components/layout/AdminLayout'

// Lazy load — performance ke liye
const Home = lazy(() => import('./pages/public/Home'))
const Blog = lazy(() => import('./pages/public/Blog'))
const PostDetail = lazy(() => import('./pages/public/PostDetail'))
const Projects = lazy(() => import('./pages/public/Projects'))
const Login = lazy(() => import('./pages/admin/Login'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const PostEditor = lazy(() => import('./pages/admin/PostEditor'))
const PostEdit = lazy(() => import('./pages/admin/PostEdit'))
const ProjectManager = lazy(() => import('./pages/admin/ProjectManager'))
const Analytics = lazy(() => import('./pages/admin/Analytics'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/edit/:id" element={<PostEdit />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App