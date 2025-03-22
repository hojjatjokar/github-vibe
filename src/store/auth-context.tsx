"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type AuthContextType = {
  isLoggedIn: boolean
  token: string | null
  login: (code: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  // Initialize auth state after component mounts
  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null
    setIsLoggedIn(!!storedToken)
    setToken(storedToken)
  }, [])

  const login = async (code: string) => {
    const response = await fetch(`/api/auth/github/callback?code=${code}`)
    const userData = await response.json()
    localStorage.setItem("token", userData.access_token)
    setIsLoggedIn(true)
    setToken(userData.access_token)
  }

  const logout = async () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
