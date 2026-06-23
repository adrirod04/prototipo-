import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, role, setRole, user, morosidad, setMorosidad } = useContext(AppContext)

  const logout = () => {
    setRole(null)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex sidebar flex-col w-64 p-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xl font-bold">S</div>
          <div>
            <div className="text-sm font-title">SIGRIEA</div>
            <div className="text-xs opacity-80">Sistema de Gestión</div>
          </div>
        </div>

        <nav className="mt-6 flex-1">
          <ul className="space-y-2 text-sm">
            <li className="px-3 py-2 rounded hover:bg-white/5">Dashboard</li>
            {role === 'admin' && <li className="px-3 py-2 rounded hover:bg-white/5">Finanzas</li>}
            {role === 'admin' && <li className="px-3 py-2 rounded hover:bg-white/5">Gobernanza</li>}
            <li className="px-3 py-2 rounded hover:bg-white/5">Reservaciones</li>
            <li className="px-3 py-2 rounded hover:bg-white/5">Anuncios / Reportes</li>
            <li className="px-3 py-2 rounded hover:bg-white/5">Documentos</li>
          </ul>
        </nav>

        <div className="mt-auto px-3 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className={`px-2 py-1 text-xs rounded ${morosidad ? 'morosidad-badge' : 'bg-white/5'}`} onClick={() => setMorosidad(!morosidad)}>
              Morosidad: {morosidad ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar with hamburger */}
      <div className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white/60 shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded bg-slate-100">
          <svg width="20" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#1C3040" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div className="text-sm font-title">SIGRIEA</div>
        <div className="flex items-center gap-2">
          <div className="text-xs">Morosidad</div>
          <button onClick={() => setMorosidad(!morosidad)} className={`px-2 py-1 rounded ${morosidad ? 'bg-red-500 text-white' : 'bg-slate-200'}`}>
            {morosidad ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Mobile offcanvas */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 p-4 sidebar">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xl font-bold">S</div>
                <div>
                  <div className="text-sm font-title">SIGRIEA</div>
                  <div className="text-xs opacity-80">Sistema de Gestión</div>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-white">Cerrar</button>
            </div>
            <nav className="mt-6">
              <ul className="space-y-2 text-sm text-white">
                <li className="px-3 py-2 rounded hover:bg-white/5">Dashboard</li>
                <li className="px-3 py-2 rounded hover:bg-white/5">Reservaciones</li>
                <li className="px-3 py-2 rounded hover:bg-white/5">Anuncios</li>
                <li className="px-3 py-2 rounded hover:bg-white/5">Documentos</li>
              </ul>
            </nav>

            <div className="mt-auto px-3 py-4 flex items-center justify-between">
              <button onClick={() => setMorosidad(!morosidad)} className={`px-2 py-1 text-xs rounded ${morosidad ? 'bg-red-500 text-white' : 'bg-white/5 text-white'}`}>
                Morosidad: {morosidad ? 'ON' : 'OFF'}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
