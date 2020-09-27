import { authContext } from './AuthProvider'
import { useContext } from 'react'

export const useUserInfo = () => useContext(authContext)
