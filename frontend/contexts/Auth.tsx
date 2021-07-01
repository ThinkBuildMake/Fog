// https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries

import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { NextRouter, useRouter } from 'next/router'
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
                postRequest(`${envs.PRODUCTION}/user/auth`, {}).then((data) => {
                    // Use status to determine validity of user
                    const { status } = data
                    if (status == 200) {
                        setUser(true)
                    } else {
                        setUser(false)
                    }
                })
            }
            setLoading(false)
        }
        loadUserFromToken()
    }, [])

    async function login(form: loginForm): Promise<void> {
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

    function logout(): void {
        // Remove Tokens
        localStorage.removeItem('access_token')
        setUser(false)
        router.push('/')
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

type loginCallback = (form: loginForm) => Promise<void>
type logoutCallback = () => void
interface loginForm {
    userName: string
    password: string
}
export const useAuth = () => useContext(AuthContext) as ContextType
interface ContextType {
    isAuthenticated: boolean
    loading: boolean
    router: NextRouter
    login: loginCallback
    logout: logoutCallback
}

//https://stackoverflow.com/questions/66640086/react-usecontext-ts-error-property-does-not-exist-on
export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, loading, router } = useAuth()
    if (
        loading ||
        (!isAuthenticated && router.route != '/' && router.route != '/about')
    ) {
        return <h1>Loading</h1>
    }
    return children
}
