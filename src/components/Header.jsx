import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Header() {
  const { user, setRole, setUser, morosidad, bcvRate } = useContext(AppContext)

  const logout = () => {
    setRole(null)
    setUser(null)
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
      <div>
        <div className="text-sm text-slate-600">Bienvenido, <span className="font-title">{user?.name}</span></div>
        <div className="text-xs text-slate-400">Tasa BCV: <span className="font-semibold">{bcvRate} Bs/USD</span></div>
      </div>
      <div className="flex items-center gap-4">
        {morosidad && <div className="text-sm morosidad-badge px-3 py-1 rounded">MOROSIDAD ACTIVA</div>}
        <div className="flex items-center gap-2">
          <div className="text-sm">{user?.tower ? `${user.tower} • ${user.apt}` : ''}</div>
          <div className="px-3 py-2 bg-slate-100 rounded text-sm">
            <button onClick={logout} className="text-sm">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </header>
  )
}
