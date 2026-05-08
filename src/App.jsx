import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Owner from './pages/Owner'

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded font-semibold transition-colors ${
      isActive
        ? 'bg-amber-400 text-blue-950'
        : 'text-amber-100 hover:bg-blue-800'
    }`

  return (
    <nav className="w-full bg-blue-900 px-6 py-3 flex gap-3">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/owner" className={linkClass}>
        Owner
      </NavLink>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-950">
      <Navbar />
      <main className="flex justify-center flex-1">
        <div className="p-6 gap-y-6 flex flex-col w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/owner" element={<Owner />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
