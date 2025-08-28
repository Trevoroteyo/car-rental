import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({ children, roles }) => {
  const { auth } = useContext(AuthContext)

  // still loading or not fetched yet
  if (auth === undefined || auth.authenticated === undefined) {
    return <div>Loading...</div> 
  }

  // not logged in
  if (!auth.authenticated) {
    return <Navigate to="/" replace /> // redirect to landing/home
  }

  // check role if provided (optional)
  if (roles && !roles.some(r => auth.user?.roles?.includes(r))) {
    return <Navigate to="/" replace />
  }

  // ✅ authorized
  return children
}

export default RouteGuard
