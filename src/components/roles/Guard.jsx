import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

export default function GuardViews() {
  const { logs, setLogs } = useContext(AppContext)
  const [scanCode, setScanCode] = useState('')
  const [visitor, setVisitor] = useState({ name: '', destination: '' })

  const registerManual = () => {
    const entry = {
      id: Date.now(),
      visitor: visitor.name || 'Invitado',
      destination: visitor.destination || 'Portería',
      action: 'Entrada',
      time: new Date().toLocaleString()
    }
    setLogs(prev => [entry, ...prev])
    setVisitor({ name: '', destination: '' })
  }

  const scan = () => {
    const entry = {
      id: Date.now(),
      visitor: `QR:${scanCode}`,
      destination: 'Control de acceso',
      action: 'Entrada',
      time: new Date().toLocaleString()
    }
    setLogs(prev => [entry, ...prev])
    setScanCode('')
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm font-title">Panel Rápido (tablet)</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="py-6 rounded bg-green-500 text-white">Registrar Entrada</button>
            <button className="py-6 rounded bg-red-500 text-white">Registrar Salida</button>
            <div className="col-span-2 mt-2">
              <div className="text-sm font-title">Escáner QR (simulado)</div>
              <div className="flex gap-2 mt-2">
                <input value={scanCode} onChange={(e)=>setScanCode(e.target.value)} className="border px-2 py-1 flex-1" placeholder="Pegar código QR" />
                <button onClick={scan} className="px-3 py-1 bg-slate-800 text-white rounded">Scan</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm font-title">Resumen del turno</div>
          <div className="text-xs mt-2">Últimas acciones</div>
          <div className="mt-3 space-y-2 max-h-56 overflow-auto">
            {logs.length === 0 && <div className="text-xs text-slate-500">Sin actividad</div>}
            {logs.map(l => (
              <div key={l.id} className="p-2 border rounded">
                <div className="text-sm"><strong>{l.visitor}</strong> — {l.action}</div>
                <div className="text-xs text-slate-500">{l.destination} • {l.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-4 mt-4">
        <div className="text-sm font-title">Control de acceso manual</div>
        <div className="flex gap-2 mt-2">
          <input value={visitor.name} onChange={(e)=>setVisitor({...visitor, name: e.target.value})} placeholder="Nombre visitante" className="border px-2 py-1 flex-1" />
          <input value={visitor.destination} onChange={(e)=>setVisitor({...visitor, destination: e.target.value})} placeholder="Destino (Apto/Torre)" className="border px-2 py-1 flex-1" />
          <button onClick={registerManual} className="px-3 py-1 bg-slate-800 text-white rounded">Registrar</button>
        </div>
      </div>

      <div className="card p-4 mt-4">
        <div className="text-sm font-title mb-2">Bitácora</div>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 text-left">
            <tr><th>Visitante</th><th>Destino</th><th>Acción</th><th>Hora</th></tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td>{l.visitor}</td>
                <td>{l.destination}</td>
                <td>{l.action}</td>
                <td>{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-4 mt-4">
        <div className="text-sm font-title mb-2">Reportes de turno</div>
        <div className="text-xs">Crear reporte de incidencia</div>
        <textarea className="w-full border rounded px-2 py-1 mt-2" rows="4" />
        <div className="flex justify-end mt-2">
          <button className="px-3 py-1 bg-slate-800 text-white rounded">Enviar Reporte</button>
        </div>
      </div>
    </div>
  )
}
