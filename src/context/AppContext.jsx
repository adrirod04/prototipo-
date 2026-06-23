import React, { createContext, useState, useEffect } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null) // 'admin' | 'resident' | 'guard'
  const [user, setUser] = useState(null) // { name, tower, apt }
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [morosidad, setMorosidad] = useState(false) // simulador global
  const [bcvRate, setBcvRate] = useState(25.5) // tasa BCV simulada
  // Simulated datasets
  const [announcements, setAnnouncements] = useState([])
  const [payments, setPayments] = useState([
    { id: 1, resident: 'María Pérez', apt: 'T1-201', amountBs: 800, amountUSD: 20, status: 'pending' },
    { id: 2, resident: 'Juan López', apt: 'T2-402', amountBs: 1200, amountUSD: 30, status: 'pending' }
  ])
  const [reservations, setReservations] = useState([
    { id: 'piscina', name: 'Piscina', available: true },
    { id: 'salon', name: 'Salón de usos múltiples', available: true },
    { id: 'gimnasio', name: 'Gimnasio', available: true }
  ])
  const [votes, setVotes] = useState([
    { id: 1, title: 'Reparación ascensor', options: [
      { id: 'o1', text: 'Opción 1 - $1000 (3 años)', votes: 5 },
      { id: 'o2', text: 'Opción 2 - $850 (1 año)', votes: 3 },
      { id: 'o3', text: 'Opción 3 - $100/mes', votes: 2 },
      { id: 'rej', text: 'Rechazar', votes: 1 }
    ]}
  ])
  const [logs, setLogs] = useState([]) // guard logs

  useEffect(() => {
    // persist role and morosidad to localStorage for demo convenience
    const saved = localStorage.getItem('sigriea_state')
    if (saved) {
      const parsed = JSON.parse(saved)
      setRole(parsed.role)
      setUser(parsed.user)
      setMorosidad(parsed.morosidad)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sigriea_state', JSON.stringify({ role, user, morosidad }))
  }, [role, user, morosidad])

  return (
    <AppContext.Provider value={{
      role, setRole,
      user, setUser,
      sidebarOpen, setSidebarOpen,
      morosidad, setMorosidad,
      bcvRate, setBcvRate,
      announcements, setAnnouncements,
      payments, setPayments,
      reservations, setReservations,
      votes, setVotes,
      logs, setLogs
    }}>
      {children}
    </AppContext.Provider>
  )
}
