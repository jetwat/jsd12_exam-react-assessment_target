import { useState, useEffect } from 'react'

const API_URL = 'https://67eca027aa794fb3222e43e2.mockapi.io/members'

function MemberTable({ members, isAdmin, onDelete }) {
  if (members.length === 0) {
    return <p className="text-amber-200 text-center py-4">No members found.</p>
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-blue-800 text-amber-100">
          <th className="px-4 py-2 border border-blue-700">Name</th>
          <th className="px-4 py-2 border border-blue-700">Last Name</th>
          <th className="px-4 py-2 border border-blue-700">Position</th>
          {isAdmin && (
            <th className="px-4 py-2 border border-blue-700">Action</th>
          )}
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr
            key={member.id}
            className="even:bg-blue-900 odd:bg-blue-950 text-amber-50"
          >
            <td className="px-4 py-2 border border-blue-800">{member.name}</td>
            <td className="px-4 py-2 border border-blue-800">{member.lastName}</td>
            <td className="px-4 py-2 border border-blue-800">{member.position}</td>
            {isAdmin && (
              <td className="px-4 py-2 border border-blue-800">
                <button
                  onClick={() => onDelete(member.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CreateUserForm({ onCreated }) {
  const [form, setForm] = useState({ name: '', lastName: '', position: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.lastName || !form.position) return
    setLoading(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const newMember = await res.json()
      onCreated(newMember)
      setForm({ name: '', lastName: '', position: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-900 p-5 rounded-lg flex flex-col gap-3 mb-6"
    >
      <h2 className="text-amber-300 font-bold text-lg">Create User Here</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="flex-1 px-3 py-2 rounded bg-blue-800 text-amber-50 placeholder-blue-400 border border-blue-700 focus:outline-none focus:border-amber-400"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="flex-1 px-3 py-2 rounded bg-blue-800 text-amber-50 placeholder-blue-400 border border-blue-700 focus:outline-none focus:border-amber-400"
        />
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          required
          className="flex-1 px-3 py-2 rounded bg-blue-800 text-amber-50 placeholder-blue-400 border border-blue-700 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-blue-950 font-bold px-5 py-2 rounded transition-colors"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default function Home() {
  const [mode, setMode] = useState(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setMembers(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleCreated = (newMember) => {
    setMembers((prev) => [...prev, newMember])
  }

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const isAdmin = mode === 'admin'

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-amber-100">Home</h1>

      {/* Mode toggle buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setMode('user')}
          className={`px-5 py-2 rounded font-semibold transition-colors ${
            mode === 'user'
              ? 'bg-amber-400 text-blue-950'
              : 'bg-blue-800 text-amber-100 hover:bg-blue-700'
          }`}
        >
          User Home Section
        </button>
        <button
          onClick={() => setMode('admin')}
          className={`px-5 py-2 rounded font-semibold transition-colors ${
            mode === 'admin'
              ? 'bg-amber-400 text-blue-950'
              : 'bg-blue-800 text-amber-100 hover:bg-blue-700'
          }`}
        >
          Admin Home Section
        </button>
      </div>

      {mode && (
        <>
          {isAdmin && <CreateUserForm onCreated={handleCreated} />}

          <div className="bg-blue-900 rounded-lg p-5">
            <h2 className="text-amber-300 font-bold text-lg mb-4">
              {isAdmin ? 'Admin Home Section' : 'User Home Section'}
            </h2>
            {loading ? (
              <p className="text-amber-200 text-center py-4">Loading...</p>
            ) : (
              <MemberTable
                members={members}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
