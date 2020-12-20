import React, { useContext, useState } from 'react'

const AuthContext = React.createContext()

const useAuthProvider = () => {
    const [name, setName] = useState(localStorage.getItem('name'))

    const set = ( _name) => {
        if (_name)
            localStorage.setItem('name', _name)
        else
            localStorage.removeItem('name')
        setName(_name)
    }
    return {name, set}
}

export const useAuth = () => {
    const provider = useContext(AuthContext)

    const isLogged = !!provider.name
    const login = (_name) => provider.set(_name)
    const logout = () => provider.set(null)

    return {isLogged, login, logout, name: provider.name}
}

export const AuthProvider = ({children}) => {
    const provider = useAuthProvider()
    return(
        <AuthContext.Provider value={provider}>
            {children}
        </AuthContext.Provider>
    )
}
