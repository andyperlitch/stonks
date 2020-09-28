import { gql } from 'apollo-boost'
import React from 'react'
import { useQuery } from 'react-apollo'
import { GetUserInfo } from './types/getUserInfo'

const GET_USER_INFO = gql`
  query GetUserInfo {
    me {
      id
      email
      username
      googleId
      thumbnail
      isAuthenticated
    }
  }
`

export interface AuthContextType {
  isAuthenticated: boolean
  isAuthenticating: boolean
  id?: string | null
  email?: string | null
  username?: string | null
  thumbnail?: string | null
}

export const authContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthenticating: false,
  id: '',
  email: '',
  username: '',
  thumbnail: '',
})

export const AuthProvider = ({ children }: any) => {
  const { data, loading } = useQuery<GetUserInfo>(GET_USER_INFO)

  const value: AuthContextType = {
    ...data?.me,
    isAuthenticated: data?.me?.isAuthenticated || false,
    isAuthenticating: loading,
  }

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
