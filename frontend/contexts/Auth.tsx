// https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries

import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { postRequest, envs } from '@functions/customfuncs'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    // TODO: More substantial user information
    const [user, setUser] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        async function loadUserFromToken() {
            const token = localStorage.getItem('access_token')
            if (token) {
                console.log(
                    "Got a token in the cookies, let's see if it is valid"
                )
                // Send Validation API Request
                const { data: status } = await postRequest(
                    `${envs.PRODUCTION}/user/auth`,
                    {}
                )
                if (user) setUser(user)
            }
            console.log('LOADED')
            setLoading(false)
        }
        loadUserFromToken()
    }, [])

    const login = async (form) => {
        // Send Request
        postRequest(`${envs.PRODUCTION}/user/login`, {
            email: form.userName,
            password: form.password
        }).then((data) => {
            const { status, message } = data
            if (status != 200) {
                console.log(message)
            } else {
                // Store Token In Local storage
                localStorage.setItem('access_token', data.access_token)
                setUser(true)

                // TODO: localStorage Hook
                // Redirect User to home page
                router.push('home')
            }
        })
    }

    const logout = (email, password) => {
        // Cookies.remove('token')
        // setUser(null)
        // delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                login,
                loading,
                logout,
                router
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, loading, router } = useAuth()
    console.log(loading)
    console.log(router.route)
    if (loading || (!isAuthenticated && router.route != '/')) {
        return <h1>Loading</h1>
    }
    return children
}
