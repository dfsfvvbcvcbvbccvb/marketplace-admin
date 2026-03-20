import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    )

    const [userId, setUserId] = useState(localStorage.getItem('user_id'))

    const login = (data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user_id', data.user_id)

        setUserId(data.user_id)
        setIsAuthenticated(true)
    }

    

    const logout = async () => {
    try {
        await api.post('/logout')
    } finally {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')

        setIsAuthenticated(false)
        setUserId(undefined)
    }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
