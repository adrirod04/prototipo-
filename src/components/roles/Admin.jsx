import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

function KPI({ title, value, suffix }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="text-2xl font-title mt-2">{value} <span className="text-sm">{suffix}</span></div>
    </div>
  )
}

function SimpleBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="card p-4">
      <div className="text-sm font-title mb-2">Ingresos vs Gastos (mes)</div>
      <div className="flex gap-3 items-end h-40">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center">
            <div className="h-full flex items-end justify-center">
              <div style={{ height: `${(d.value/max)*100}%` }} className={`w-10 rounded ${d.type==='ingreso' ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>
            <div className="text-xs mt-2">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminViews() {
  const { morosidad, payments, setPayments, votes, setVotes, announcements, setAnnouncements, reservations } = useContext(AppContext)
  const [tab, setTab] = useState('dashboard')
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', body: '' })

  const approvePayment = (id, approve) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: approve ? 'approved' : 'rejected' } : p))
  }

  const postAnnouncement = () => {
    setAnnouncements(prev => [{ id: Date.now(), ...newAnnouncement }, ...prev])
    setNewAnnouncement({ title: '', body: '' })
  }

  const downloadReport = (type) => {
    const csv = 'Año, Recaudación\n2024, 120000\n2025, 130000'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reporte_simulado.${type === 'excel' ? 'csv' : 'pdf'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sampleChartData = [
    { label: 'Ene', value: 8000, type: 'ingreso' },
    { label: 'Feb', value: 6000, type: 'gasto' },
    { label: 'Mar', value: 10000, type: 'ingreso' },
    { label: 'Abr', value: 7000, type: 'gasto' }
  ]

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setTab('dashboard')} className={`px-3 py-2 rounded ${tab==='dashboard'?'bg-white':'bg-white/50'}`}>Vista General</button>
        <button onClick={() => setTab('finanzas')} className={`px-3 py-2 rounded ${tab==='finanzas'?'bg-white':'bg-white/50'}`}>Finanzas</button>
        <button onClick={() => setTab('gobernanza')} className={`px-3 py-2 rounded ${tab==='gobernanza'?'bg-white':'bg-white/50'}`}>Gobernanza</button>
        <button onClick={() => setTab('reservaciones')} className={`px-3 py-2 rounded ${tab==='reservaciones'?'bg-white':'bg-white/50'}`}>Reservaciones</button>
        <button onClick={() => setTab('anuncios')} className={`px-3 py-2 rounded ${tab==='anuncios'?'bg-white':'bg-white/50'}`}>Anuncios / Reportes</button>
      </div>

      {tab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <KPI title="Tasa BCV" value="25.50" suffix="Bs/USD" />
          <KPI title="Recaudación (USD)" value="12,400" suffix="USD" />
          <KPI title="Recaudación (Bs)" value="316,200" suffix="Bs" />

          <div className="lg:col-span-2">
            <SimpleBarChart data={sampleChartData} />
          </div>

          <div className="card p-4">
            <div className="text-sm font-title mb-2">Alertas críticas</div>
            {morosidad ? (
              <div className="p-3 rounded border border-red-300 bg-red-50 text-red-700">
                Condominio inoperable por morosidad alta. Muchas funciones están limitadas.
              </div>
            ) : (
              <div className="p-3 rounded border border-green-100 bg-green-50">Operación normal</div>
            )}
          </div>
        </div>
      )}

      {tab === 'finanzas' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="text-sm font-title mb-3">Distribución de gastos</div>
            {/* Simple pie-like representation */}
            <div className="flex gap-4">
              <svg width="160" height="160" viewBox="0 0 32 32">
                <circle r="16" cx="16" cy="16" fill="#f3f4f6"></circle>
                <path d="M16 16 L32 16 A16 16 0 0 1 23 2 Z" fill="#60a5fa"></path>
                <path d="M16 16 L23 2 A16 16 0 0 1 8 4 Z" fill="#34d399"></path>
                <path d="M16 16 L8 4 A16 16 0 0 1 16 32 Z" fill="#f97316"></path>
              </svg>
              <div>
                <div className="text-sm">Mantenimiento: 45%</div>
                <div className="text-sm">Servicios: 30%</div>
                <div className="text-sm">Reparaciones: 25%</div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-title">Pagos pendientes</div>
              <input placeholder="Buscar deudor" className="border rounded px-2 py-1 text-sm" />
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-slate-500">
                <tr><th>Residente</th><th>Apto</th><th>Monto (Bs)</th><th>USD</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} className="align-top">
                    <td>{p.resident}</td>
                    <td>{p.apt}</td>
                    <td>{p.amountBs}</td>
                    <td>{p.amountUSD}</td>
                    <td className="space-x-2">
                      {p.status === 'pending' ? (
                        <>
                          <button onClick={() => approvePayment(p.id, true)} className="px-2 py-1 bg-green-500 text-white text-xs rounded">Aprobar</button>
                          <button onClick={() => approvePayment(p.id, false)} className="px-2 py-1 bg-red-500 text-white text-xs rounded">Rechazar</button>
                        </>
                      ) : <span className="text-xs">{p.status}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'gobernanza' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-title">Historial de votaciones</div>
              <button onClick={() => setShowVoteModal(true)} className="px-3 py-1 bg-slate-800 text-white rounded text-sm">Registrar Voto Asistido</button>
            </div>

            {votes.map(v => (
              <div key={v.id} className="mb-3">
                <div className="font-semibold">{v.title}</div>
                <div className="flex gap-2 mt-2">
                  {v.options.map(o => (
                    <div key={o.id} className="p-2 bg-slate-50 rounded text-sm">
                      <div className="text-xs">{o.text}</div>
                      <div className="text-xs font-bold mt-1">{o.votes} votos</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card p-4">
            <div className="text-sm font-title mb-2">Resultados en tiempo real</div>
            <div className="space-y-2">
              {votes[0].options.map(o => (
                <div key={o.id} className="flex items-center justify-between">
                  <div className="text-sm">{o.text}</div>
                  <div className="text-sm font-semibold">{o.votes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'reservaciones' && (
        <div className="grid grid-cols-1 gap-4">
          <div className="card p-4">
            <div className="text-sm font-title mb-2">Disponibilidad general</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {reservations.map(r => (
                <div key={r.id} className="p-3 border rounded">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs mt-2">{r.available ? 'Disponible' : 'Ocupado'}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <div className="text-sm font-title mb-2">Reservaciones - Control</div>
            <div className="text-xs">Puedes ver y administrar reservaciones. En el prototipo las reservas se simulan.</div>
          </div>
        </div>
      )}

      {tab === 'anuncios' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="text-sm font-title mb-2">Publicar comunicado</div>
            <input value={newAnnouncement.title} onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})} placeholder="Título" className="w-full border rounded px-2 py-1 mb-2" />
            <textarea value={newAnnouncement.body} onChange={e => setNewAnnouncement({...newAnnouncement, body: e.target.value})} placeholder="Cuerpo" className="w-full border rounded px-2 py-1 mb-2"></textarea>
            <button onClick={postAnnouncement} className="px-3 py-2 bg-slate-800 text-white rounded">Publicar</button>
          </div>

          <div className="card p-4">
            <div className="text-sm font-title mb-2">Incidentes / Quejas</div>
            <div className="text-xs mb-2">Nuevo incidente: completa y publica opciones presupuestarias</div>
            <div className="space-y-2">
              <div className="p-2 border rounded">
                <div className="font-semibold">Ascensor dañado</div>
                <div className="text-xs mt-1">Op1: $1000 (3 años) • Op2: $850 (1 año) • Op3: $100/mes</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-title mb-2">Descargar informes</div>
              <div className="flex gap-2">
                <button onClick={() => downloadReport('excel')} className="px-3 py-1 bg-slate-800 text-white rounded">Descargar Excel</button>
                <button onClick={() => downloadReport('pdf')} className="px-3 py-1 bg-slate-600 text-white rounded">Descargar PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showVoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowVoteModal(false)} />
          <div className="bg-white p-6 rounded z-10 w-96">
            <h3 className="font-title mb-2">Registrar Voto Asistido</h3>
            <div className="text-sm mb-2">Selecciona Torre y Apartamento. Sube firma (simulado).</div>
            <select className="w-full border rounded px-2 py-1 mb-2">
              <option>Torre 1</option>
              <option>Torre 2</option>
            </select>
            <select className="w-full border rounded px-2 py-1 mb-2">
              <option>Apto 201</option>
              <option>Apto 402</option>
            </select>
            <input type="file" className="mb-3" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowVoteModal(false)} className="px-3 py-1 rounded border">Cancelar</button>
              <button onClick={() => { setShowVoteModal(false) }} className="px-3 py-1 bg-slate-800 text-white rounded">Registrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
