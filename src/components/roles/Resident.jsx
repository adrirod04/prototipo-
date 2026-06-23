import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

function DebtCard({ morosidad, bcvRate, amountBs, amountUSD }) {
  const usdToBs = amountUSD * bcvRate
  const totalBs = amountBs + usdToBs
  return (
    <div className="card p-4">
      <div className="text-sm">Resumen de deuda</div>
      <div className={`mt-2 text-2xl font-title ${morosidad ? 'text-red-600' : ''}`}>
        {amountBs} Bs • {amountUSD} USD
      </div>
      <div className="text-xs mt-1">Total Bs (convertido): {totalBs.toFixed(2)} Bs</div>
      {morosidad && <div className="mt-2 p-2 rounded bg-red-50 text-red-700">Alerta: morosidad activa. Algunas funciones bloqueadas.</div>}
    </div>
  )
}

export default function ResidentViews() {
  const { morosidad, bcvRate, reservations } = useContext(AppContext)
  const [tab, setTab] = useState('dashboard')
  const [debt] = useState({ amountBs: 1200, amountUSD: 40 })

  const [bookingLocked] = useState(false)

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setTab('dashboard')} className={`px-3 py-2 rounded ${tab==='dashboard'?'bg-white':'bg-white/50'}`}>Dashboard</button>
        <button onClick={() => setTab('wallet')} className={`px-3 py-2 rounded ${tab==='wallet'?'bg-white':'bg-white/50'}`}>Mi Billetera</button>
        <button onClick={() => setTab('votaciones')} className={`px-3 py-2 rounded ${tab==='votaciones'?'bg-white':'bg-white/50'}`}>Votaciones</button>
        <button onClick={() => setTab('reservar')} className={`px-3 py-2 rounded ${tab==='reservar'?'bg-white':'bg-white/50'}`}>Reservar</button>
        <button onClick={() => setTab('visitas')} className={`px-3 py-2 rounded ${tab==='visitas'?'bg-white':'bg-white/50'}`}>Mis Visitas</button>
        <button onClick={() => setTab('documentos')} className={`px-3 py-2 rounded ${tab==='documentos'?'bg-white':'bg-white/50'}`}>Documentos</button>
      </div>

      {tab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DebtCard morosidad={morosidad} bcvRate={bcvRate} amountBs={debt.amountBs} amountUSD={debt.amountUSD} />
          <div className="card p-4 md:col-span-2">
            <div className="text-sm font-title">Mural de anuncios</div>
            <div className="mt-2 space-y-2">
              <div className="p-2 border rounded">Ascensor en mantenimiento esta semana.</div>
              <div className="p-2 border rounded">Reunión de condominio: viernes 6pm.</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'wallet' && (
        <div className="card p-4">
          <div className="text-sm font-title">Mi Billetera</div>
          <div className="mt-2">Deuda Bs: {debt.amountBs}</div>
          <div>Deuda USD: {debt.amountUSD}</div>
          <div className="mt-3">
            <label className="text-xs">Subir comprobante de pago</label>
            <input type="file" className="block mt-2" />
            <button className="mt-3 px-3 py-1 bg-slate-800 text-white rounded">Subir</button>
          </div>
          {morosidad && <div className="mt-3 p-2 rounded bg-red-50 text-red-700">Debes regularizar tu deuda</div>}
        </div>
      )}

      {tab === 'votaciones' && (
        <div className="card p-4">
          <div className="text-sm font-title mb-2">Votaciones disponibles</div>
          <div className="space-y-3">
            <div className="p-3 border rounded">
              <div className="font-semibold">Reparación ascensor</div>
              <div className="text-xs mt-1">Elige una opción:</div>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 border rounded text-sm">Opción 1</button>
                <button className="px-2 py-1 border rounded text-sm">Opción 2</button>
                <button className="px-2 py-1 border rounded text-sm">Opción 3</button>
                <button className="px-2 py-1 border rounded text-sm">Rechazar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'reservar' && (
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-title">Reservar áreas</div>
            {morosidad && <div className="text-sm text-red-600">Reservas bloqueadas por morosidad</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {reservations.map(r => (
              <div key={r.id} className="p-3 border rounded relative">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs mt-1">{r.available ? 'Disponible' : 'Ocupado'}</div>
                <div className="mt-3">
                  <button disabled={morosidad} className={`px-3 py-1 rounded ${morosidad ? 'bg-slate-200' : 'bg-slate-800 text-white'}`}>
                    Reservar
                  </button>
                </div>
                {morosidad && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <div className="text-red-600 text-sm">Bloqueado por morosidad</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'visitas' && (
        <div className="card p-4">
          <div className="text-sm font-title">Generador de código QR</div>
          <div className="mt-3">
            <QRCodeCard />
            <div className="mt-3 text-xs text-slate-600">Válido por 24h</div>
          </div>
        </div>
      )}

      {tab === 'documentos' && (
        <div className="card p-4">
          <div className="text-sm font-title mb-2">Documentos</div>
          <div className="space-y-2">
            <button className="px-3 py-1 bg-white rounded">Descargar recibo (PDF)</button>
            <button className="px-3 py-1 bg-white rounded">Reglamento (PDF)</button>
          </div>
        </div>
      )}
    </div>
  )
}

function QRCodeCard() {
  const [code, setCode] = useState(null)
  const generate = () => {
    const c = 'QR-' + Math.random().toString(36).substring(2,10).toUpperCase()
    setCode(c)
  }

  return (
    <div className="p-3 border rounded inline-block">
      {code ? (
        <div className="flex flex-col items-center gap-2">
          <svg width="140" height="140" viewBox="0 0 140 140" className="bg-white">
            <rect width="140" height="140" fill="#ffffff"></rect>
            <rect x="12" y="12" width="36" height="36" fill="#1C3040" />
            <rect x="92" y="12" width="36" height="36" fill="#1C3040" />
            <rect x="12" y="92" width="36" height="36" fill="#1C3040" />
            <text x="70" y="80" fill="#1C3040" fontSize="10" textAnchor="middle">{code}</text>
          </svg>
          <div className="text-xs">Código: <span className="font-semibold">{code}</span></div>
        </div>
      ) : (
        <button onClick={generate} className="px-3 py-1 bg-slate-800 text-white rounded">Generar QR</button>
      )}
    </div>
  )
}
