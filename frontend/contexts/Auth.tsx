// https://www.mikealche.com/software-development/how-to-implement-authentication-in-next-js-without-third-party-libraries

import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { NextRouter, useRouter } from 'next/router'
import {
    postRequest,
    envs,
    postRequestWithoutHeaders
} from '@functions/customfuncs'

const AuthContext = createContext({})

type loginCallback = (form: loginForm) => Promise<void>
type signUpCallback = (form: signUpForm) => Promise<void>
type logoutCallback = () => void
interface loginForm {
    email: string
    password: string
}
interface signUpForm {
    first_name: string
    last_name: string
    email: string
    password: string
}
interface ContextType {
    isAuthenticated: boolean
    loading: boolean
    router: NextRouter
    login: loginCallback
    logout: logoutCallback
    register: signUpCallback
}

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
                postRequest(`${envs[process.env.appEnv]}/user/auth`, {}).then(
                    (data) => {
                        // Use status to determine validity of user
                        const { status } = data
                        if (status == 200) {
                            setUser(true)
                        } else {
                            setUser(false)
                        }
                    }
                )
            }
            setLoading(false)
        }
        loadUserFromToken()
    }, [])

    async function register(form: signUpForm): Promise<void> {
        postRequestWithoutHeaders(`${envs[process.env.appEnv]}/user/register`, {
            email: form.email,
            password: form.password,
            first_name: form.first_name,
            last_name: form.last_name
        }).then((data) => {
            const { status, message } = data
            if (status != 201) {
                console.log(message)
            } else {
                localStorage.setItem('access_token', data.access_token)
                setUser(true)
                // Redirect User to home page
                router.push('home')
            }
        })
    }
    async function login(form: loginForm): Promise<void> {
        postRequestWithoutHeaders(`${envs[process.env.appEnv]}/user/login`, {
            email: form.email,
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
                router,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) as ContextType

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
