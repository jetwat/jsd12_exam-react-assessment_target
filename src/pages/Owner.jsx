const OWNER = {
  id: '07_Jetwat(Chong/ชง)_JSD12',
  name: 'Jetwat',
  lastName: 'W.',
  bio: 'A passionate Full-Stack Developer currently studying in JSD12 bootcamp. Loves building clean UIs and learning new technologies every day.',
}

export default function Owner() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-amber-100">Owner Profile</h1>

      <div className="bg-blue-900 rounded-lg p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        {/* Avatar */}
        <img
          src="https://placehold.co/160x160/1e3a5f/fbbf24?text=Owner"
          alt="Owner avatar"
          className="w-40 h-40 rounded-full border-4 border-amber-400 object-cover"
        />

        {/* Info */}
        <div className="flex flex-col gap-3 text-amber-50">
          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              ID
            </span>
            <p className="text-xl font-bold text-amber-300">{OWNER.id}</p>
          </div>

          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              Name
            </span>
            <p className="text-2xl font-extrabold">
              {OWNER.name} {OWNER.lastName}
            </p>
          </div>

          <div>
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
              Short Biography
            </span>
            <p className="mt-1 text-amber-100 leading-relaxed max-w-lg">
              {OWNER.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
