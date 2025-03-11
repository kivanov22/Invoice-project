'use client'
import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  role: string | null
  handleLogin: (user: User, token: string) => void
  handleLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setRole(parsedUser.role)
    }
  }, [])

  const handleLogin = (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    setUser(user)
    setRole(user.role)
  }

  const handleLogout = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setRole(null)

    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  }

  return (
    <AuthContext.Provider value={{ user, setUser, role, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
