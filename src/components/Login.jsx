import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Login() {
  const { setRole, setUser } = useContext(AppContext)

  const selectRole = (r) => {
    // assign demo user names
    if (r === 'admin') setUser({ name: 'Administrador SIGRIEA' })
    if (r === 'resident') setUser({ name: 'Residente Demo', tower: 'T1', apt: '201' })
    if (r === 'guard') setUser({ name: 'Vigilante Turno A' })
    setRole(r)
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#F4F0EA' }}>
      <div className="w-full max-w-xl p-8">
        <div className="card p-8">
          <h1 className="text-2xl mb-2 font-title">SIGRIEA — Acceso</h1>
          <p className="text-sm mb-6">Selecciona tu rol para iniciar sesión (prototipo sin backend)</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => selectRole('admin')} className="py-4 rounded border border-slate-200 hover:shadow-md">Administrador</button>
            <button onClick={() => selectRole('resident')} className="py-4 rounded border border-slate-200 hover:shadow-md">Residente</button>
            <button onClick={() => selectRole('guard')} className="py-4 rounded border border-slate-200 hover:shadow-md">Vigilante</button>
          </div>
          <div className="mt-6 text-xs text-slate-500">
            Demo: Los estados (pagos, anuncios, reservaciones) son simulados en memoria.
          </div>
        </div>
      </div>
    </div>
  )
}
