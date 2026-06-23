import React, { useContext } from 'react'
import { AppProvider, AppContext } from './context/AppContext'
import Login from './components/Login'
import Layout from './components/Layout'

const InnerApp = () => {
  const { role } = useContext(AppContext)
  return (
    <div className="min-h-screen">
      {!role ? <Login /> : <Layout />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  )
}
