import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import AdminViews from './roles/Admin'
import ResidentViews from './roles/Resident'
import GuardViews from './roles/Guard'
import { AppContext } from '../context/AppContext'

export default function Layout() {
  const { role } = useContext(AppContext)

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 overflow-auto" style={{ background: '#F4F0EA' }}>
          {role === 'admin' && <AdminViews />}
          {role === 'resident' && <ResidentViews />}
          {role === 'guard' && <GuardViews />}
        </main>
      </div>
    </div>
  )
}
