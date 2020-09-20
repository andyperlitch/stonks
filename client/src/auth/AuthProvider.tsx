import React from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  isAuthenticating: boolean
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: false,
})

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
  const value: AuthContextType = {
    isAuthenticated: false,
    isAuthenticating: false,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
